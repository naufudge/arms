'use client';

import React, { useEffect, useState } from 'react'
import { Collection } from '@prisma/client';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const Page = () => {
  const [collections, setCollections] = useState<Collection[] | undefined | null>();
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  async function getCollections() {
    try {
      const response = await axios.get("/api/collection")
      if (response.data.success) {
        setCollections(response.data.collections)
        console.log(response.data.collections)
      } else {
        console.log("Failed to fetch collections.")
        setCollections(null)
      }
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
      } else { console.log("An unknown error occurred") }
    }
  }

  useEffect(() => {
    if (!collections) getCollections();
  }, [collections])

  return (
    <div className="font-poppins">
      <div className='mb-8'>
        <h1 className="font-bold text-[2rem]">Upload Records</h1>
        <div className='text-sm text-stone-400 mt-1 italic'>Start uploading documents by first selecting the respective collection below.</div>
      </div>

      <div className='flex place-items-center gap-5'>
        <div className='font-medium text-md'>Select a Collection</div>
        {/* Collections Dropdown */}
        <Select disabled={!collections} onValueChange={(value) => setSelectedCollection(value)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Collections"/>
          </SelectTrigger>
          <SelectContent>
            {collections?.map((collection) => (
              <SelectItem
                key={collection.id}
                value={collection.id.toString()}
                className='hover:cursor-pointer'
              >{collection.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCollection && 
        <div className='grid grid-cols-2'>


        </div>
      }
    </div>
  )
}

export default Page