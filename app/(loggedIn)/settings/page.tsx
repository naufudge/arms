'use client';

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import axios from "axios";


const Page = () => {
    const [roleName, setRoleName] = useState("")
    const [showAddUserRole, setShowAddUserRole] = useState(false)

    const handleRoleAdd = async () => {
        try {
            if (roleName) {
                await axios.post("/api/userRole", {roleName})
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred');
            }
        }
    }

    return (        
        <div className='font-poppins'>
            <h1 className="font-bold text-[2rem]">Settings</h1>
            <div className='text-sm text-stone-400 mt-1 italic'>Manage ARMs to your liking!</div>

            <br />

            <div>
                <Button onClick={() => setShowAddUserRole(!showAddUserRole)} className=''>Add a User Role</Button>
                <Dialog open={showAddUserRole} onOpenChange={setShowAddUserRole}>
                    {/* <DialogTrigger>Add User Role</DialogTrigger> */}
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

export default Page