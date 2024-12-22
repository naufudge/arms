'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserRole } from '@prisma/client';


interface IndividualSettingPageProps {
    setting: string
}

interface AddRolePageProps {

}

const IndividualSettingPage = ({ params }: { params: Promise<IndividualSettingPageProps> }) => {
    const [setting, setSetting] = useState<string | null>(null);
    // const [userRoles, setUserRoles] = useState<UserRole[] | undefined | null>();

    useEffect(() => {
        params.then((resolvedParams) => {
            setSetting(resolvedParams.setting);
        });
    }, [params]);

    switch (setting) {
        case "add_role":
            return <AddRolePage />

        case "add_collection":
            return <AddCollectionPage />

        default:
            return <div>{setting}</div>
    }
}

// Add Role Page Component
const AddRolePage = () => {
    const [roleName, setRoleName] = useState("")

    const handleRoleAdd = async () => {
        try {
            if (roleName) {
                await axios.post("/api/userRole", { roleName })
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
        <div className='font-poppins grid grid-cols-3 gap-8'>
            <div className='col-span-full'>
                <h1 className='font-bold text-[2rem]'>Manage User Roles</h1>
                <div className='text-sm text-stone-400 mt-1 italic'>Add a new user role or manage existing user roles.</div>
            </div>

            {/* User Roles Table */}
            <div className='col-span-2 pr-10'>
                <Table className=''>
                    <TableHeader>
                        <TableRow className='font-semibold'>
                            <TableHead>#</TableHead>
                            <TableHead>Role Name</TableHead>
                            <TableHead>No. of Users</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </div>
            {/* Add Role Card */}
            <div className='col-span-1'>
                <Card>
                    <CardHeader>
                        <CardTitle>Add a User Role</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-2 mt-2'>
                            <Label htmlFor='roleName'>Role Name</Label>
                            <Input id='roleName' onChange={(e) => setRoleName(e.target.value)} placeholder='Role Name' />
                        </div>
                        <br />
                        <Button onClick={handleRoleAdd}>Add Role</Button>
                    </CardContent>
                    <CardFooter />
                </Card>
            </div>
        </div>
    )
}

const AddCollectionPage = () => {
    return (
        <div>
            <div className='col-span-full'>
                <h1 className='font-bold text-[2rem]'>Add a Collection</h1>
                <div className='text-sm text-stone-400 mt-1 italic'>Add a new collection to upload records, or manage existing collections.</div>
            </div>

            <div className='col-span-2'>

            </div>

            <div className='col-span-1'>

            </div>

        </div>
    )
}

export default IndividualSettingPage