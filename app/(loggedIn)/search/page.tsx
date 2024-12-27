'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator';
import { Record } from '@prisma/client';
import axios from 'axios';
import { Filter, Loader2, Upload } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import { columns } from './columns';

const Page = () => {
    const [records, setRecords] = useState<Record[]>()
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function getRecords() {
            try {
                const response = await axios.get("/api/record")
                if (response.data.success) {
                    setRecords(response.data.records)
                } else { setRecords([]) }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message)
                } else {
                    console.error("An unknown error occurred.")
                }
                setRecords([])
            }
        }

        if (!records) getRecords()
    }, [records])

    return (
        <div className="font-poppins w-full">
        <h1 className="font-bold text-[2rem]">Search</h1>
        <div className='text-sm text-stone-400 mt-1 italic'>Search the uploaded records.</div>
        <br />
        <div className='flex justify-between'>
            <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search...'
            className='w-1/2 py-5 placeholder:opacity-40'
            />
            <div className='flex gap-4'>
                <Button variant={"outline"} className='h-full'><Filter/> Filter</Button>
                <Button className='h-full'><Upload/> <Link href={"/upload"}>Upload</Link></Button>
            </div>
        </div>
        
        <Separator className='my-10' />
        
        {/* Records Table */}
        <div>
            { records && records.length != 0 ?
                <DataTable columns={columns} data={records} />
            : records?.length === 0 ?
                <div>No records yet. Start uploading now!</div>
            : 
                <Loader2 className='animate-spin mx-auto' />
            }
        </div>
        </div>
    )
}

export default Page
