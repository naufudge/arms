'use client';

import React, { useState } from 'react'
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


const page = () => {
  const [addUserPopup, setAddUserPopup] = useState(false)

  const [userRoles, setUserRoles] = useState([
    {value: "admin", name: "Admin"},
    {value: "uploader", name: "Uploader"},
    {value: "search", name: "Search"},
  ])

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")


  const handleAddUser = async () => {
    try {
      
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
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Role" />
                  </SelectTrigger>
                  <SelectContent id='role'>
                    {userRoles.map((role, index) => (
                      <SelectItem key={index} value={role.value}>{role.name}</SelectItem>
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