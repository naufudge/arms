'use client';

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User } from '@prisma/client';
import { AlertBar } from '@/components/Alerts';
import axios from 'axios';

// username: admin
// password: TAp3YvJaLu**

const Page = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState<"success" | "error">("error")
    const [alertTitle, setAlertTitle] = useState("")
    const [alertDescription, setAlertDescription] = useState("")

    const [user, setUser] = useState<User | null | undefined>()

    const [showPassChange, setShowPassChange] = useState(false)

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const showError = (description: string = "Invalid Username or Password. Please try again!") => {
        setShowAlert(false)
        setAlertType("error")
        setAlertTitle("Error")
        setAlertDescription(description)
        setShowAlert(true)
    }

    const showSuccess = () => {
        setShowAlert(false)
        setAlertType("success")
        setAlertTitle("Success")
        setAlertDescription("Successfully Logged In!")
        setShowAlert(true)
    }


    const handleLogIn = async () => {
        try {
            if (!username || !password) {
                showError()
                return
            }

            const response = await axios.post("/api/user", { username, password })

            if (response.data.success === false) {
                showError()
                return
            } else if (response.data.success === true && response.data.passChange === false) {
                setUser(response.data.user)

                showSuccess()
                return
            } else if (response.data.success === true && response.data.passChange === true) {
                setUser(response.data.user)
                setShowAlert(false)
                setShowPassChange(true)
                return
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred');
            }
        }
    }

    const handlePassChange = async () => {
        try {
            if (!newPassword || !confirmPassword) {
                showError("Please fill in all fields.")
                return
            }

            if (newPassword != confirmPassword) {
                showError("Passwords do not match. Please try again.")
                return
            }

            const response = await axios.post("/api/user/reset", { username, newPassword })

            if (response.data.success === false) {
                showError("An error occurred. Please try again.")
                return
            } else if (response.data.success === true) {
                setShowAlert(false)
                setAlertType("success")
                setAlertTitle("Success")
                setAlertDescription("Password successfully changed!")
                setShowAlert(true)
                return
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('An unknown error occurred');
            }
            showError("An error occurred. Please try again.")
        }
    }

    return (
        <div className='w-screen h-screen overflow-hidden font-poppins transition-all duration-200'>
            <div className='flex flex-col place-items-center justify-center w-full h-full'>
                {showPassChange ?
                    <Card className='px-5 pt-3 flex flex-col gap-3'>
                        <AlertBar title={alertTitle} description={alertDescription} alertType={alertType} className={`${showAlert ? "" : "hidden"} w-full mt-4`} />

                        <CardHeader className='flex flex-col gap-2'>
                            <CardTitle><h1 className='font-bold text-[2rem]'>Change Password</h1></CardTitle>
                            <CardDescription>Please enter a new password.</CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-9'>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor='newPassword'>New Password</Label>
                                <Input id='newPassword' placeholder='New Password' className='py-5' type='password' onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                                <Input id='confirmPassword' placeholder='Confirm Password' className='py-5' type='password' onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-5'>
                                <Button onClick={handlePassChange}>Change Password</Button>
                            </div>
                        </CardContent>
                        <CardFooter />
                    </Card>
                    :
                    <Card className='px-5 pt-3 flex flex-col gap-3'>
                        <AlertBar title={alertTitle} description={alertDescription} alertType={alertType} className={`${showAlert ? "" : "hidden"} w-full mt-4`} />
                        <CardHeader className='flex flex-col gap-2'>
                            <CardTitle><h1 className='font-bold text-[2.5rem]'>Login</h1></CardTitle>

                            <CardDescription>Welcome Back! Please enter your details.</CardDescription>
                        </CardHeader>

                        <CardContent className='flex flex-col gap-9'>
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor='username'>Username</Label>
                                <Input id='username' placeholder='Username' className='py-5' onChange={(e) => setUsername(e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label htmlFor='password'>Password</Label>
                                <Input id='password' placeholder='Password' className='py-5' type='password' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-5'>
                                <div className='text-[12px] text-gray-400 italic hover:underline hover:cursor-pointer'>Forgot Password?</div>
                                <Button
                                    onClick={handleLogIn}
                                >Login</Button>
                            </div>
                        </CardContent>
                        <CardFooter />
                    </Card>
                }
            </div>
        </div>
    )
}

export default Page