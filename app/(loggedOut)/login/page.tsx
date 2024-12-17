import React from 'react'
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


const page = () => {
    return (
        <div className='w-screen h-screen overflow-hidden font-poppins transition-all duration-200'>
            <div className='flex flex-col place-items-center justify-center w-full h-full'>
                <Card className='px-5 pt-3 flex flex-col gap-3'>
                    <CardHeader className='flex flex-col gap-2'>
                        <CardTitle><h1 className='font-bold text-[2.5rem]'>Login</h1></CardTitle>

                        <CardDescription>Welcome Back! Please enter your details.</CardDescription>
                    </CardHeader>

                    <CardContent className='flex flex-col gap-9'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='username'>Username</Label>
                            <Input id='username' placeholder='Username' className='py-5' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='password'>Password</Label>
                            <Input id='password' placeholder='Password' className='py-5' />
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-[12px] text-gray-400 italic hover:underline hover:cursor-pointer'>Forgot Password?</div>
                            <Button>Login</Button>
                        </div>
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default page