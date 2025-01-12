'use client';

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteRequest, Record, User } from '@prisma/client';
import axios from 'axios';
import { capitalizeFirstLetter, getFormattedDate } from '@/utils/Helpers';
import { Check, Cross, Loader2, X } from 'lucide-react';

type FullDeleteRequest = DeleteRequest & {
    record: Record,
    reqUser: User,
    approveUser: User
}

const DeleteRequestPage = () => {
    const [deleteRequests, setDeleteRequests] = useState<FullDeleteRequest[]>()

    useEffect(() => {
        async function getDeleteRequests() {
            try {
                const response = await axios.get("/api/record/delete")
                if (response.data.success) setDeleteRequests(response.data.deleteRequests)
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
                console.log(errorMessage)
            }
        }

        if (!deleteRequests) getDeleteRequests()
    }, [deleteRequests])

    return (
        <div className='font-poppins'>
            <div className='flex flex-col place-items-start gap-2'>
                <h1 className="font-bold text-[2rem]">Delete Requests</h1>
                <div className='text-sm text-stone-400 italic'>Manage record deletion requests from users.</div>
            </div>

            <br />

            {deleteRequests ?
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Record Title</TableHead>
                            <TableHead>Requested by</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deleteRequests.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{request.record.title}</TableCell>
                                <TableCell>{capitalizeFirstLetter(request.reqUser.username)}</TableCell>
                                <TableCell>{getFormattedDate(request.createdOn)}</TableCell>
                                {/* Actions */}
                                <TableCell>
                                    <div className='flex gap-5'>
                                        {request.approved ? 
                                            <>Approved</>
                                        :
                                            <>
                                                {/* Approve Button */}
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Check
                                                                onClick={() => { }}
                                                                className='hover:cursor-pointer hover:text-primary text-stone-600 transition-all duration-200'
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Approve</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                {/* Decline Button */}
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <X
                                                                onClick={() => { }}
                                                                className='hover:cursor-pointer hover:text-primary text-stone-600 transition-all duration-200'
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Decline</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </>
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                :
                <div className='text-center mx-auto flex justify-center'><Loader2 className='animate-spin size-10' /></div>
            }

        </div>
    )
}

export default DeleteRequestPage