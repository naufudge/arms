'use client';

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator';
import { Collection, Record, User } from '@prisma/client';
import axios from 'axios';
import { Loader2, Upload } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from './data-table';
import { columns } from './columns';
import Filter from '@/components/Filter';
import { FilterDataType } from '@/lib/MyTypes';

const Page = () => {
    const [records, setRecords] = useState<Record[]>()
    
    const [collections, setCollections] = useState<Collection[] | undefined | null>();
    const [users, setUsers] = useState<User[]>()
    
    const [filteredRecords, setFilteredRecords] = useState<Record[]>()
    const [filterData, setFilterData] = useState<FilterDataType>({
        title: "",
        creator: "",
        collection: "",
        date: new Date(),
        uploaded: new Date(),
        user: "",
    })

    async function getRecords() {
        try {
            const response = await axios.get("/api/record")
            if (response.data.success) {
                setRecords(response.data.records)
                setFilteredRecords(response.data.records)
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
    async function getCollections() {
        try {
            const response = await axios.get("/api/collection")
            if (response.data.success) {
                setCollections(response.data.collections)
            } else {
                console.log("Failed to fetch collections.")
                setCollections(null)
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
            } else { console.log("An unknown error occurred") }
        }
    }
    async function getUsers() {
        try {
            const response = await axios.get("/api/users")
            if (response.data.success) setUsers(response.data.users)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred');
            }
        }
    }

    useEffect(() => {
        if (!records) getRecords()
        if (!collections) getCollections();
        if (!users) getUsers();
    }, [records, collections, users])

    const handleSearch = (query: string) => {
        if (query && records) {
            const searchQuery = query.toLowerCase();
            const searchResults = records.filter((record) =>
                record.title.toLowerCase().includes(searchQuery) || record.description.toLowerCase().includes(searchQuery) || record.creator.toLowerCase().includes(searchQuery)
            );
            console.log(searchResults);
            setFilteredRecords(searchResults);
        } else {
            setFilteredRecords(records);
        }
    };

    const handleFilter = () => {

    }

    return (
        <div className="font-poppins w-full">
            <h1 className="font-bold text-[2rem]">Search</h1>
            <div className='text-sm text-stone-400 mt-1 italic'>Search the uploaded records.</div>
            <br />
            <div className='flex justify-between'>
                <Input
                    id='search'
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder='Search...'
                    className='w-1/2 py-5 placeholder:opacity-40'
                />
                <div className='flex gap-4'>
                    <Filter collections={collections} users={users} filterData={filterData} setFilterData={setFilterData} />
                    <Button className='h-full'><Upload /> <Link href={"/upload"}>Upload</Link></Button>
                </div>
            </div>

            <Separator className='my-10' />

            {/* Records Table */}
            <div>
                {filteredRecords && filteredRecords.length != 0 ?
                    <DataTable columns={columns} data={filteredRecords} />
                    : filteredRecords?.length === 0 ?
                        <div className='text-stone-500 text-center italic'>Record not found.</div>
                        : records?.length === 0 ?
                            <div className='text-stone-500 text-center italic'>There are no records.</div>
                            :
                            <Loader2 className='animate-spin mx-auto size-9' />
                }
            </div>
        </div>
    )
}

export default Page
