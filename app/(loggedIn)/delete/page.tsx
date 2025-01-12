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
import { Badge } from "@/components/ui/badge";
import { DeleteRequest, Record, User } from '@prisma/client';
import axios from 'axios';
import { capitalizeFirstLetter, getFormattedDate } from '@/utils/Helpers';
import { Check, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import ConfirmationPopup from '@/components/ConfirmationPopup';

type FullDeleteRequest = DeleteRequest & {
    record: Record,
    reqUser: User,
    approveUser?: User
}

const DeleteRequestPage = () => {
    const [user, setUser] = useState<User>()
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState<FullDeleteRequest>()
    const [deleteRequests, setDeleteRequests] = useState<FullDeleteRequest[]>()

    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get("/api/user/me")
                if (response.data.success) setUser(response.data.user)
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
                console.log(errorMessage)
            }
        }
        async function getDeleteRequests() {
            try {
                const response = await axios.get("/api/record/delete")
                if (response.data.success) setDeleteRequests(response.data.deleteRequests)
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
                console.log(errorMessage)
            }
        }

        if (!deleteRequests) getDeleteRequests();
        if (!user) getUser();
    }, [deleteRequests, user])


    const handleDeleteApproval = async (deleteRequest: FullDeleteRequest, status: boolean) => {
        try {
            if (status === true && user) {
                const data = {
                    type: "approve",
                    deleteRequest: {...deleteRequest, approveUserId: user.id}
                }
                const response = await axios.post("/api/record/delete", data)
                console.log(response.data)
            } else {

            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
            console.log(errorMessage)
        } finally {
            setSelectedRequest(undefined)
            location.reload()
        }
    }

    return (
        <div className='font-poppins'>
            <div className='flex flex-col place-items-start gap-2'>
                <h1 className="font-bold text-[2rem]">Delete Requests</h1>
                <div className='text-sm text-stone-400 italic'>Manage record deletion requests from users.</div>
            </div>

            <br />

            {selectedRequest && 
                <ConfirmationPopup
                    open={showConfirmation}
                    setOpen={setShowConfirmation}
                    proceed={() => handleDeleteApproval(selectedRequest, true)}
                    description='Approve the deletion of this record?'
                />
            }

            {deleteRequests ?
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Record Title</TableHead>
                            <TableHead>Requested by</TableHead>
                            <TableHead>Approved by</TableHead>
                            <TableHead>Request Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deleteRequests.reverse().map((request, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">
                                    {request.recordId ? 
                                        <Link className='hover:underline hover:text-stone-500' href={`/record/${request.recordId}`}>{request.record.title}</Link>
                                    :
                                        <div className='italic text-stone-500'>Deleted Record</div>
                                    }
                                </TableCell>

                                <TableCell>{capitalizeFirstLetter(request.reqUser.username)}</TableCell>

                                <TableCell>
                                    {request.approveUser ?
                                        capitalizeFirstLetter(request.approveUser.username)
                                        :
                                        "N/A"
                                    }
                                </TableCell>

                                <TableCell>{getFormattedDate(request.createdOn)}</TableCell>
                                {/* Actions */}
                                <TableCell>
                                    <div className='flex gap-5'>
                                        {request.approved ?
                                            <Badge>Approved</Badge>
                                            :
                                            <>
                                                {/* Approve Button */}
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Check
                                                                onClick={() => {
                                                                    setSelectedRequest(request)
                                                                    setShowConfirmation(true)
                                                                }}
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