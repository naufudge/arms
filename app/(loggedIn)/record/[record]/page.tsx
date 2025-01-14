'use client';

import React, { useEffect, useState } from 'react';
import FilePreview from '@/components/FilePreview';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { Download, FileIcon, Loader2, Pencil, SquareArrowOutUpRight } from 'lucide-react';
import { getFormattedDate } from '@/utils/Helpers';
import { Button } from '@/components/ui/button';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';
import EditRecord from '@/components/EditRecord';
import { FullRecord } from '@/lib/MyTypes';
import { File, Record } from '@prisma/client';

interface RecordPageProps {
    record: string;
}

const RecordPage = ({ params }: { params: Promise<RecordPageProps> }) => {
    const [recordId, setRecordId] = useState<string | null>(null);
    const [record, setRecord] = useState<FullRecord | null>();

    const [fileUrl, setFileUrl] = useState("");
    const [contentType, setContentType] = useState("");

    const [editRecordOpen, setEditRecordOpen] = useState(false);

    const isMobile = useIsMobile();

    useEffect(() => {
        params.then((resolvedParams) => {
            setRecordId(resolvedParams.record);
        });
    }, [recordId, params]);

    useEffect(() => {
        async function getRecord() {
            try {
                if (recordId) {
                    const response = await axios.post("/api/record/id", { id: parseInt(recordId) })
                    const recordData: Record & { files: File[] } = response.data.record
                    if (response.data.success) {
                        setRecord(response.data.record)
                        const fileResponse = await axios.post("/api/pinata/retrieve", { fileId: recordData.files[0].id })
                        if (fileResponse.data.success) {
                            setFileUrl(fileResponse.data.file)
                            setContentType(fileResponse.data.contentType)
                        }
                    }
                    return
                }
                setRecord(null)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error.message)
                } else {
                    console.log("An unknown error occurred.")
                }
                setRecord(null)
            }
        }

        if (!record) getRecord();
    }, [recordId, record, fileUrl, contentType])

    const handleDownload = (name: string) => {
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = `${name}.${contentType.split("/")[1]}`
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };


    return (
        <div className='font-poppins'>
            <div className='flex justify-between place-items-center'>
                <div className='flex flex-col gap-2'>
                    <h1 className="font-bold text-[2rem] flex gap-4 place-items-center">{!isMobile && <FileIcon className='h-full w-7' />} Record View</h1>
                    <p className='text-sm'><span className='font-semibold'>Collection:</span> {record?.collection.name}</p>
                </div>
                <Button variant={"outline"} onClick={() => setEditRecordOpen(true)}><Pencil /> Edit Record</Button>
            </div>

            <Separator className='mb-10 mt-5' />

            <div>
                {record &&
                    <>
                        <EditRecord open={editRecordOpen} setOpen={setEditRecordOpen} record={record} />

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            {/* Left Side */}
                            <div className='flex flex-col gap-4'>
                                <div className='relative flex flex-col gap-4 border p-5 h-fit min-h-[370px] rounded-lg shadow-sm'>
                                    {/* Open in new tab button */}
                                    <div className='absolute top-4 right-4 hover:text-primary hover:cursor-pointer transition-all'>
                                        <Link href={fileUrl} target='_blank'><SquareArrowOutUpRight className='size-5' /></Link>
                                    </div>

                                    <h2 className='font-bold text-center text-xl text-stone-600'>File Preview</h2>
                                    <div className='flex justify-center place-items-center h-full'>
                                        {fileUrl ?
                                            <FilePreview contentType={contentType} url={fileUrl} />
                                            :
                                            <Loader2 className='animate-spin size-8' />
                                        }
                                    </div>
                                </div>

                                {/* User Details & Download Button */}
                                <div className='flex flex-col gap-4 md:flex-row justify-between place-items-start'>
                                    {/* User Detail */}
                                    <div className='p-3 border rounded-lg flex gap-4 place-items-center w-full md:w-fit pr-20'>
                                        <Avatar className="h-10 w-10 rounded-lg">
                                            <AvatarImage src="" alt={record.user.username} />
                                            <AvatarFallback className="rounded-full">{record.user.username[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className='flex flex-col gap-1 text-sm min-w-full'>
                                            <span>{record.user.username}</span>
                                            <span className='text-stone-400'>{getFormattedDate(record.createdOn)}</span>
                                        </div>
                                    </div>

                                    <div className='w-full md:w-fit'>
                                        {/* <Link href={"/"} className='text-[12px] text-stone-500'> Open in new tab</Link> */}
                                        {/* Download button */}
                                        <Button className='w-full' onClick={() => handleDownload(record.title)}><Download /> Download</Button>
                                    </div>

                                </div>
                            </div>

                            {/* Ride Side */}
                            <div className='border rounded-lg p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm shadow-sm'>
                                <h2 className='flex font-bold text-xl text-stone-600 col-span-full justify-center mb-4'>Metadata</h2>

                                <div className='h-fit'>
                                    <div className='font-bold'>Title</div>
                                    <div>{record.title}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Subject</div>
                                    <div>{record.subject}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Creator</div>
                                    <div>{record.creator}</div>
                                </div>

                                <div className='col-span-full'>
                                    <div className='font-bold'>Description</div>
                                    <div>{record.description}</div>
                                </div>

                                <Separator className='col-span-full my-2' />

                                <div className='h-fit'>
                                    <div className='font-bold'>Publisher</div>
                                    <div>{record.publisher ? record.publisher : "-"}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Contributor</div>
                                    <div>{record.contributor ? record.contributor : "-"}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Date</div>
                                    <div>{record.date ? getFormattedDate(record.date) : "-"}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Type</div>
                                    <div>{record.type ? record.type : "-"}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Format</div>
                                    <div>{record.format ? record.format : "-"}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Identifier</div>
                                    <div>{record.identifier ? record.identifier : "-"}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Language</div>
                                    <div>{record.language ? record.language : "-"}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Relation</div>
                                    <div>{record.relation ? record.relation : "-"}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Coverage</div>
                                    <div>{record.coverage ? record.coverage : "-"}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Rights</div>
                                    <div>{record.rights ? record.rights : "-"}</div>
                                </div>

                                <div className='h-fit'>
                                    <div className='font-bold'>Source</div>
                                    <div className='overflow-ellipsis'>{record.source ? record.source : "-"}</div>
                                </div>

                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default RecordPage