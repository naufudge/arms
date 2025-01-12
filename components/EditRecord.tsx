'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FullRecord, recordFormSchema } from '@/lib/MyTypes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import RecordForm from './RecordForm';


interface EditRecordProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    record: FullRecord;
}

const EditRecord: React.FC<EditRecordProps> = ({ open, setOpen, record }) => {
    const form = useForm<z.infer<typeof recordFormSchema>>({
        resolver: zodResolver(recordFormSchema),
        defaultValues: {
            title: "",
            subject: "",
            description: "",
            creator: "",
            publisher: "",
            contributor: "",
            date: new Date(),
            type: "",
            format: "",
            identifier: "",
            source: "",
            language: "",
            relation: "",
            coverage: "",
            rights: ""
        },
        values: {
            title: record.title,
            subject: record.subject ? record.subject : "",
            description: record.description,
            creator: record.creator,
            publisher: record.publisher ? record.publisher : "",
            contributor: record.contributor ? record.contributor : "",
            date: new Date(record.date),
            type: record.type,
            format: record.format ? record.format : "",
            identifier: record.identifier ? record.identifier : "",
            source: record.source ? record.source : "",
            language: record.language ? record.language : "",
            relation: record.relation ? record.relation : "",
            coverage: record.coverage ? record.coverage : "",
            rights: record.rights
        }
    })

    const { toast } = useToast() 
    const [loading, setLoading] = useState(false)

    async function onEditSubmit(values: z.infer<typeof recordFormSchema>) {
        try {
            setLoading(true)
            const response = await axios.post("/api/record/update", {id: record.id, data: values} )
            if (response.data.success) {
                toast({
                    title: "Success",
                    description: "Successfully edited the record!",
                })
            }
        } catch {
            toast({
                title: "Error",
                description: "Encountered an error while editing the record.",
            })
        } finally { 
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='w-full max-w-5xl max-h-screen'>
                <DialogHeader>
                    <DialogTitle>Edit Record</DialogTitle>
                    <DialogDescription>
                        Make any changes that you would like to make.
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-screen">
                    <RecordForm form={form} onSubmit={onEditSubmit} uploading={loading} />
                </div>
                <DialogFooter />
            </DialogContent>
        </Dialog>
    )
}

export default EditRecord