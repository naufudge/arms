'use client';

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import axios from "axios";


const page = () => {
    const [roleName, setRoleName] = useState("")

    const handleRoleAdd = async () => {
        try {
            if (roleName) {
                const response = await axios.post("/api/userRole", {roleName})
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (        
        <div className='font-poppins'>
            <h1 className="font-bold text-[2rem]">Settings</h1>
            <div className='text-sm text-stone-400 mt-1 italic'>Manage ARMs to your liking!</div>

            <br />

            <div>
                <Dialog>
                    <DialogTrigger>Add User Role</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a User Role</DialogTitle>
                            <DialogDescription>
                                Add custom user roles
                            </DialogDescription>
                        </DialogHeader>
                        
                        <Input onChange={(e) => setRoleName(e.target.value)} placeholder='Role Name' />

                        <Button onClick={handleRoleAdd}>Add Role</Button>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}

export default page