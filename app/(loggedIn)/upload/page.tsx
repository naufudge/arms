'use client';

import React, { useEffect, useState } from 'react'
import { Collection } from '@prisma/client';
import { pinata } from "@/utils/config";
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle2Icon, Upload } from 'lucide-react';
import Image from 'next/image';
import { checkIfPDF } from '@/utils/Helpers';
import AddRecord from '@/components/AddRecord';


const Page = () => {
  const [collections, setCollections] = useState<Collection[] | undefined | null>();
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedPDF, setUploadedPDF] = useState<boolean>(false);

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

  const handleFileInputClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFile(e.target?.files?.[0]);
	};

  const uploadFile = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      setUploading(true);
      const urlRequest = await axios.post("/api/pinata/url", { name: file.name }); // Fetches the temporary upload URL
      const urlResponse = urlRequest.data;
      const upload = await pinata.upload
        .file(file)
        .url(urlResponse.url); // Upload the file with the signed URL
      const signRequest = await fetch("/api/pinata/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cid: upload.cid }),
      });
      const signedResponse = await signRequest.json();
      setUploadedPDF(file.name.endsWith(".pdf"));
      setUrl(signedResponse);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  return (
    <div className="font-poppins">
      <div className='mb-8'>
        <h1 className="font-bold text-[2rem]">Upload Records</h1>
        <div className='text-sm text-stone-400 mt-1 italic'>Start uploading documents by first selecting the respective collection below.</div>
      </div>

      <div className='flex place-items-center gap-5 justify-center'>
        <Label htmlFor='collection' className='font-medium text-md'>Select a Collection</Label>
        {/* Collections Dropdown */}
        <Select disabled={!collections} onValueChange={(value) => setSelectedCollection(value)}>
          <SelectTrigger id='collection' className="w-[350px]">
            <SelectValue placeholder="Collections" />
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
        <>
          <Separator className='my-8' />
          <div className='grid grid-cols-2 gap-8'>
            <div className='flex flex-col gap-3 col-span-1'>
              {/* <Label htmlFor='fileInput' className=''>Upload Records</Label> */}
              <div className='flex flex-col gap-5 place-items-center justify-center border p-5 py-10 rounded-lg border-dashed border-stone-200'>
                <div className='text-stone-400 text-sm italic'>Drag and drop your files here!</div>
                <input id='fileInput' type='file' className='hidden' onChange={handleFileChange} />
                <Button onClick={handleFileInputClick} className='w-fit'><Upload /> Choose a file</Button>

                {/* Display file name after user chooses a file */}
                {file && <div className='text-stone-400 text-sm flex place-items-center gap-2 w-fit'><CheckCircle2Icon color='green' /> {file.name}</div>}
                {/* Display the uploaded file after uploading successfully */}
                {url && !uploadedPDF ? 
                  <Image src={url} alt="Image from Pinata" width={500} height={0} />
                : url && uploadedPDF &&
                  // Display PDF in an iframe 
                  <iframe src={url} width="100%" height="500px" style={{ border: 'none' }} />
                }
              </div>
            </div>

            {/* File Metadata form below */}
            <div className='flex flex-col gap-3 col-span-1'>
              <div className='flex flex-col gap-4 border p-5 rounded-lg'>
                <div className='flex flex-col gap-2'>
                  <h2 className='font-bold text-xl'>Metadata Information</h2>
                  <p className='text-sm italic text-stone-400'>Fill in the metadata information of the file.</p>
                </div>

                <AddRecord />
              </div>
              {/* <Button className='' disabled={uploading} onClick={uploadFile}>
                {uploading ? "Uploading..." : "Upload"}
              </Button> */}
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Page