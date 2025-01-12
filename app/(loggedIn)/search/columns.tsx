"use client"

import { useEffect, useState } from "react"
import { Record, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { getFormattedDate } from "@/utils/Helpers"
import ConfirmationPopup from "@/components/ConfirmationPopup"
import axios from "axios"

export const columns: ColumnDef<Record>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          #
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex justify-start place-items-center p-0"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => getFormattedDate(row.getValue("date")),
  },
  {
    accessorKey: "creator",
    header: "Creator",
  },
  // {
  //   accessorKey: "type",
  //   header: "Type",
  // },
  // {
  //   accessorKey: "rights",
  //   header: "Rights",
  // },
  {
    accessorKey: "createdOn",
    header: "Uploaded On",
    cell: ({ row }) => getFormattedDate(row.getValue("createdOn")),
  },
  {
    accessorKey: "collection.name",
    header: "Collection",
  },
  {
    accessorKey: "user.username",
    header: "User",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const record = row.original
      const [showDeleteRequestConfirmation, setShowDeleteRequestConfirmation] = useState(false);
      const [user, setUser] = useState<User>()

      useEffect(() => {
        async function getUser() {
          try {
            const response = await axios.get("/api/user/me")
            if (response.data.success) setUser(response.data.user)
          } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
            console.log(errorMessage)
          }
        }
        if (!user) getUser();
      }, [user])

      const handleDeleteRequest =  async () => {
        if (!user) return

        const data = {
          type: "request",
          deleteRequest: {
            reason: "",
            recordId: record.id,
            reqUserId: user.id
          }
        }

        try {
          const response = await axios.post("/api/record/delete", data)
          console.log(response.data)
          
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
          console.log(errorMessage)
        }
      }

      return (
        <>
          <ConfirmationPopup
            open={showDeleteRequestConfirmation}
            setOpen={setShowDeleteRequestConfirmation}
            description={`Would you like to request the deletion of this record: ${record.title}`}
            proceed={handleDeleteRequest}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <Link href={`/record/${record.id}`}>
                <DropdownMenuItem className="hover:cursor-pointer"><Eye /> View Record</DropdownMenuItem>
              </Link>

              <DropdownMenuItem onClick={() => setShowDeleteRequestConfirmation(true)} className="text-red-500 focus:text-red-500 hover:cursor-pointer">
                <Trash2 /> Request Deletion
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]
