'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Filter, Upload } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const page = () => {
    const [searchTerm, setSearchTerm] = useState("")
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

        <div>

        </div>
        </div>
    )
}

export default page
