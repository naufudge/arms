'use client';

import React, { useEffect, useState } from 'react'
import { Plus, RotateCcw, Loader2, Ban, BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { User, UserRole } from '@prisma/client';
import { AlertBar } from '@/components/Alerts';
import { capitalizeFirstLetter } from '@/utils/Helpers';
import ConfirmationPopup from '@/components/ConfirmationPopup';

type NewUsersType = User & {
  userRole: UserRole
}

const Page = () => {
  const [addUserPopup, setAddUserPopup] = useState(false)

  const [userRoles, setUserRoles] = useState<UserRole[]>()
  const [users, setUsers] = useState<NewUsersType[]>()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<"success" | "error">("error")
  const [alertTitle, setAlertTitle] = useState("")
  const [alertDescription, setAlertDescription] = useState("")

  // Alerts that are shown inside the "Add user" popup
  const [showPopupAlert, setShowPopupAlert] = useState(false)
  const [popupAlertDescription, setPopupAlertDescription] = useState("")

  // Contains the state of the confirmation dialog
  const [confirmationDialog, setConfirmationDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User>()

  async function getUsers() {
    try {
      const response = await axios.get("/api/users")
      if (response.data.success) setUsers(response.data.users)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }
    }
  }

  useEffect(() => {
    async function getRoles() {
      try {
        const response = await axios.get("/api/userRole")
        if (response.data.success) setUserRoles(response.data.userRoles)
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('An unknown error occurred');
        }
      }
    }
    if (!users) getUsers()
    if (!userRoles) getRoles()
  }, [userRoles, users])

  const showSuccess = (description: string) => {
    setShowAlert(false)
    setAlertType("success")
    setAlertTitle("Success")
    setAlertDescription(description)
    setShowAlert(true)
  }

  const showError = (description: string = "There was a problem when reseting the password. Please try again!") => {
    setShowAlert(false)
    setAlertType("error")
    setAlertTitle("Error")
    setAlertDescription(description)
    setShowAlert(true)
  }

  const handleAddUser = async () => {
    if (!username) {
      setPopupAlertDescription("Please enter a Username")
      setShowPopupAlert(true)
      return
    } else if (!email || !email.includes("@")) {
      setPopupAlertDescription("Please enter a valid Email")
      setShowPopupAlert(true)
      return
    } else if (!role) {
      setPopupAlertDescription("Please select a User Role")
      setShowPopupAlert(true)
      return
    } else {
      setShowPopupAlert(false)

      const data = {
        username,
        email,
        userRoleId: parseInt(role)
      }
      try {
        const response = await axios.post("/api/users", data)
        if (response.data.success) {
          setAlertType("success")
          setAlertTitle("Success")
          setAlertDescription(`Successfully created a new user! The user's initial password is: ${response.data.initialPassword}`)
          setShowAlert(true)
          await getUsers()
        }
        console.log(response.data)
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log('An unknown error occurred');
        }
        setAlertType("error")
        setAlertTitle("Error")
        setAlertDescription("There was an error when creating user. Please try again!")
        setShowAlert(true)
      }
      setAddUserPopup(false)
    }
  }

  const handleResetPassword = async () => {
    if (!selectedUser) return

    try {
      const response = await axios.post("/api/user/reset", { userId: selectedUser.id })
      if (response.data.success) {
        showSuccess(`Password updated for ${selectedUser.username}. Please inform the user to login via this temporary password: ${response.data.newPassword}`)
      } else {
        showError()
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
      } else { console.log("An unknown error occurred.") }

      showError()
    }
  }

  const handleResetPasswordClick = (user: User) => {
    setSelectedUser(user)
    setConfirmationDialog(true)
  }

  const handleDisableEnableLoginClick = (state: boolean) => {
    return state
  }

  return (
    <div className="font-poppins">
      <AlertBar title={alertTitle} description={alertDescription} alertType={alertType} className={`mb-4 ${showAlert ? "" : "hidden"}`} />

      <div className='flex place-items-start justify-between'>
        <div className='flex flex-col place-items-start gap-2'>
          <h1 className="font-bold text-[2rem]">Users Management</h1>
          <div className='text-sm text-stone-400 italic'>Manage existing users or add new users.</div>
        </div>

        <Button onClick={() => setAddUserPopup(!addUserPopup)}><Plus /> <span>Add User</span></Button>
        {/* Add User Dialog */}
        <Dialog open={addUserPopup} onOpenChange={setAddUserPopup}>
          <DialogContent className='p-7'>

            <AlertBar title='Error!' description={popupAlertDescription} alertType={"error"} className={`mt-4 ${showPopupAlert ? "" : "hidden"}`} />

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
                      <SelectItem key={index} value={role.id.toString()} className='hover:cursor-pointer'>{capitalizeFirstLetter(role.name)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddUser} className='w-fit'>Add User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <br />

      <ConfirmationPopup open={confirmationDialog} setOpen={setConfirmationDialog} proceed={handleResetPassword} description='Are you sure you want to reset the password of this user?' />

      {/* Users table */}
      <div>
        {users ?
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>User Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{capitalizeFirstLetter(user.userRole.name)}</TableCell>
                  {/* Actions */}
                  <TableCell>
                    <div className='flex gap-4'>
                      {/* Reset Password Button */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <RotateCcw
                              onClick={() => handleResetPasswordClick(user)}
                              className='hover:cursor-pointer hover:text-primary text-stone-600 transition-all duration-200'
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Reset Password</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {/* Disable or Enable Login Button */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {user.disabled ?
                              <BadgeCheck />
                              :
                              <Ban
                                onClick={() => handleDisableEnableLoginClick(false)}
                                className='hover:cursor-pointer hover:text-primary text-stone-600 transition-all duration-200'
                              />
                            }
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {user.disabled ?
                                "Enable Login"
                                :
                                "Disable Login"
                              }
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
    </div>
  )
}

export default Page