'use client';

import DashboardCard from "@/components/DashboardCard";
import { Separator } from "@/components/ui/separator";
import { UserTokenType } from "@/lib/MyTypes";
import { getFormattedDate, getGreeting } from "@/utils/Helpers";
import { Collection, Record } from "@prisma/client";
import axios from "axios";
import { FolderUp, LibraryBig, Loader2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecordsChart } from "@/components/RecordsChart";
import Link from "next/link";

type FullRecord = Record & {
  user: UserTokenType,
  collection: Collection
}

export default function Home() {
  const [records, setRecords] = useState<FullRecord[]>()
  const [collections, setCollections] = useState<Collection[] | undefined | null>();
  const [users, setUsers] = useState<UserTokenType[]>()

  async function getCollections() {
    try {
      const response = await axios.get("/api/collection")
      if (response.data.success) {
        setCollections(response.data.collections)
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

  async function getRecords() {
    try {
      const response = await axios.get("/api/record")
      if (response.data.success) setRecords(response.data.records)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
      } else { console.log("An unknown error occurred.") }
    }
  }

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
    if (!collections) getCollections();
    if (!records) getRecords();
    if (!users) getUsers();

  }, [collections, records, users])

  return (
    <div className="font-poppins">
      <h1 className="font-bold text-[2rem]">Hi, {getGreeting()}</h1>
      <div className="text-sm text-stone-400 mt-1 italic">Welcome to ARMs - Archives and Records Management System!</div>

      <Separator className="my-10" />
      {records && collections && users ?
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
              <DashboardCard title="Records" icon={<FolderUp className="text-green-600" />} content={records?.length.toString()} />
              {/* <DashboardCard title="Collections" icon={<LibraryBig className="text-orange-600" />} content={collections?.length.toString()} /> */}
              <DashboardCard title="Users" icon={<Users className="text-yellow-600" />} content={users?.length.toString()} />
            </div>
            
            {/* Recent uploads table */}
            <div className="col-span-full">
              <Card className="p-2">
                <CardHeader>
                  <CardTitle>Recent Uploads</CardTitle>
                  <CardDescription>Five most recent records uploaded to ARMs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Record Date</TableHead>
                        <TableHead className="text-right">User</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {records.slice(-5).reverse().map((record, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{record.id}</TableCell>
                          <TableCell>
                            <Link href={`/record/${record.id}`} className="hover:underline hover:text-stone-500">{record.title}</Link>
                          </TableCell>
                          <TableCell>{getFormattedDate(record.date)}</TableCell>
                          <TableCell className="text-right">{record.user.username}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
            
          {/* Records by collection */}
          <div className="h-fit">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Records per collection</CardTitle>
                  <CardDescription>Records uploaded per collection.</CardDescription>
                </CardHeader>
                <CardContent className="w-full">
                  <RecordsChart collections={collections} recordsData={records} />
                </CardContent>
              </Card>
          </div>
        </div>
        :
        <div className='text-center mx-auto flex justify-center'><Loader2 className='animate-spin size-10' /></div>
      }

    </div>
  );
}
