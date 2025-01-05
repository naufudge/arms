'use client';

import { DeleteRequest } from '@prisma/client';
import React, { useState } from 'react'

const DeleteRequestPage = () => {
    const [deleteRequests, setDeleteRequests] = useState<DeleteRequest[]>()
    return (
        <div className='font-poppins'>
            <div className='flex flex-col place-items-start gap-2'>
            <h1 className="font-bold text-[2rem]">Delete Requests</h1>
            <div className='text-sm text-stone-400 italic'>Manage record deletion requests from users.</div>
            </div>

            <br />


        </div>
    )
}

export default DeleteRequestPage