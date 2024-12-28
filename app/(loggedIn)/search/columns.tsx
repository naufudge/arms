"use client"

import { Record } from "@prisma/client"
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
          <ArrowUpDown className="" />
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
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => {}}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <Link href={`/record/${record.id}`}>
              <DropdownMenuItem className="hover:cursor-pointer"><Eye /> View Record</DropdownMenuItem>
            </Link>

            <DropdownMenuItem className="text-red-500 focus:text-red-500 hover:cursor-pointer"><Trash2 /> Request Deletion</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
