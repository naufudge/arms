'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import { capitalizeFirstLetter } from '@/lib/Helpers';
import { UserTokenType } from '@/lib/MyTypes';
import { AlertBar } from '@/components/Alerts';


interface IndividualSettingPageProps {
    setting: string
}

interface ManageRolePageProps {
    userRoles: UserRole[] | undefined | null;
    showAlert: boolean;
    setShowAlert: Dispatch<SetStateAction<boolean>>;
    alertType: "success" | "error";
    setAlertType: Dispatch<SetStateAction<"success" | "error">>;
    alertTitle: string;
    setAlertTitle: Dispatch<SetStateAction<string>>;
    alertDescription: string;
    setAlertDescription: Dispatch<SetStateAction<string>>;
}

interface ManageCollectionPageProps {

}

const IndividualSettingPage = ({ params }: { params: Promise<IndividualSettingPageProps> }) => {
    const [setting, setSetting] = useState<string | null>(null);
    const [userRoles, setUserRoles] = useState<UserRole[] | undefined | null>();
    const [user, setUser] = useState<UserTokenType>()

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState<"success" | "error">("error")
    const [alertTitle, setAlertTitle] = useState("")
    const [alertDescription, setAlertDescription] = useState("")

    async function getUser() {
        try {
            const response = await axios.get("/api/user/me")
            if (response.data.success) {
                setUser(response.data.user)
            } else { console.log("Failed to fetch user.") }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
            } else {
                console.log("An unknown error occurred.")
            }
        }
    }

    async function getUserRoles() {
        try {
            const response = await axios.get("/api/userRole")
            if (response.data.success) {
                setUserRoles(response.data.userRoles)
            } else { console.log("Failed to fetch user roles.") }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
            } else { console.log("An unknown error occurred") }
        }
    }

    async function getCollections() {
        try {
            const response = await axios.get("/api/collection")
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message)
            } else { console.log("An unknown error occurred") }
        }
    }

    useEffect(() => {
        params.then((resolvedParams) => {
            setSetting(resolvedParams.setting);
        });
    }, [params]);

    useEffect(() => {
        if (!user) getUser();
        if (!userRoles) getUserRoles();
    }, [user, userRoles])

    switch (setting) {
        case "roles":
            return (
                <ManageRolePage
                    userRoles={userRoles}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                    alertType={alertType}
                    setAlertType={setAlertType}
                    alertTitle={alertTitle}
                    setAlertTitle={setAlertTitle}
                    alertDescription={alertDescription}
                    setAlertDescription={setAlertDescription}
                />
            )

        case "collections":
            return <ManageCollectionPage />

        default:
            return <div>{setting}</div>
    }
}

// Add Role Page Component
const ManageRolePage: React.FC<ManageRolePageProps> = ({ 
    userRoles, 
    showAlert,
    setShowAlert, 
    alertType,
    setAlertType,
    alertTitle,
    setAlertTitle,
    alertDescription,
    setAlertDescription
}) => {
    const [roleName, setRoleName] = useState("")

    const showError = (description: string = "There was an error while creating the user role. Please try again!") => {
        setAlertType("error")
        setAlertTitle("Error")
        setAlertDescription(description)
        setShowAlert(true)
    }

    const showSuccess = () => {
        setAlertType("success")
        setAlertTitle("Success")
        setAlertDescription("Successfully created the user role!")
        setShowAlert(true)
    }


    const handleRoleAdd = async () => {
        try {
            if (roleName) {
                const response = await axios.post("/api/userRole", { roleName })
                if (response.data.success) {
                    showSuccess()
                } else { showError() }
            } else {
                showError("Please enter a role name")
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                showError()
            } else {
                showError('An unknown error occurred. Please try again!');
            }
        } finally { setRoleName("") }
    }

    return (
        <div className='font-poppins grid grid-cols-3 gap-8'>
            <div className='col-span-full'>
                <AlertBar alertType={alertType} title={alertTitle} description={alertDescription} className={`mb-5 ${showAlert ? "" : "hidden"}`} />
                <h1 className='font-bold text-[2rem]'>Manage User Roles</h1>
                <div className='text-sm text-stone-400 mt-1 italic'>Add a new user role or manage existing user roles.</div>
            </div>

            {/* User Roles Table */}
            <div className='col-span-2 pr-10'>
                {userRoles ?
                    <Table className=''>
                        <TableHeader>
                            <TableRow className='font-semibold'>
                                <TableHead>#</TableHead>
                                <TableHead>Role Name</TableHead>
                                <TableHead>No. of Users</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userRoles.map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell>{role.id}</TableCell>
                                    <TableCell>{capitalizeFirstLetter(role.name)}</TableCell>
                                    <TableCell>0</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    :
                    <div>Loading...</div>
                }
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

const ManageCollectionPage = () => {
    const [collectionName, setCollectionName] = useState("")
    const [collectionDescription, setCollectionDescription] = useState("")

    const handleCollectionAdd = async () => {
        if (!collectionName || !collectionDescription) {

        }
        try {
            
        } catch (error: unknown) {

        }
    }

    return (
        <div className='font-poppins grid grid-cols-3 gap-8'>
            <div className='col-span-full'>
                <h1 className='font-bold text-[2rem]'>Add a Collection</h1>
                <div className='text-sm text-stone-400 mt-1 italic'>Add a new collection to upload records, or manage existing collections.</div>
            </div>

            {/* Collections table */}
            <div className='col-span-2'>
                
            </div>

            {/* Add Collection Card */}
            <div className='col-span-1'>
                <Card>
                    <CardHeader>
                        <CardTitle>Add a Collection</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-2 mt-2'>
                            <Label htmlFor='collectionName'>Collection Name</Label>
                            <Input id='collectionName' onChange={(e) => setCollectionName(e.target.value)} placeholder='Collection Name' />
                        </div>
                        <br />
                        <div className='flex flex-col gap-2 mt-2'>
                            <Label htmlFor='collectionDescription'>Short Description</Label>
                            <Input id='collectionDescription' onChange={(e) => setCollectionDescription(e.target.value)} placeholder='Description' />
                        </div>
                        <br />
                        <Button onClick={handleCollectionAdd}>Add Collection</Button>
                    </CardContent>
                    <CardFooter />
                </Card>
            </div>
        </div>
    )
}

export default IndividualSettingPage