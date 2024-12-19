'use client';

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { UserRole } from '@prisma/client';


const page = () => {
  const [addUserPopup, setAddUserPopup] = useState(false)

  const [userRoles, setUserRoles] = useState<UserRole[]>()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    async function getRoles() {
      try {
        const response = await axios.get("/api/userRole")
        if (response.data.success) setUserRoles(response.data.userRoles)
      } catch (error: any) {
        console.log(error.message)
      }
    }
    if (!userRoles) getRoles()
  }, [userRoles])

  const handleAddUser = async () => {
    try {
      if (!username) {
        
        return
      } else if (!email) {

        return
      } else if (!role) {

        return
      }

    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className="font-poppins">
      <div className='flex place-items-start justify-between'>
        <div className='flex flex-col place-items-start gap-2'>
          <h1 className="font-bold text-[2rem]">User Management</h1>
          <div className='text-sm text-stone-400 italic'>Manage existing users or add new users.</div>
        </div>

        <Button onClick={() => setAddUserPopup(!addUserPopup)}><Plus /> <span>Add User</span></Button>
        {/* Add User Dialog */}
        <Dialog open={addUserPopup} onOpenChange={setAddUserPopup}>
          <DialogContent className='p-7'>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Fill the required information below to add a new user to the portal.
              </DialogDescription>
            </DialogHeader>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-3'>
                <Label htmlFor='username'>Username</Label>
                <Input onChange={(e) => setUsername(e.target.value)} id='username' />
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input onChange={(e) => setEmail(e.target.value)} id='email' />
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor='role'>User Role</Label>
                <Select onValueChange={(value) => setRole(value)}>
                  <SelectTrigger id='role' className="w-full">
                    <SelectValue placeholder="Select a Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles?.map((role, index) => (
                      <SelectItem key={index} value={role.id.toString()} className='hover:cursor-pointer'>{role.name.replace(/\w/, c => c.toUpperCase())}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddUser} className='w-fit'>Add User</Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>

      <div>
            

      </div>
    </div>
  )
}

export default page