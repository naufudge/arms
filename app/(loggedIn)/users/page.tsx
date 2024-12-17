import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className="font-poppins">
      <div className='flex place-items-center justify-between'>
        <h1 className="font-bold text-[2rem]">User Management</h1>
        <Button><Plus /> <span>Add User</span></Button>
      </div>
    </div>
  )
}
 
export default page