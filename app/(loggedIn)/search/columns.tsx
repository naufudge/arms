"use client"

import { Record } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    header: "#",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex justify-start place-items-center"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    
  },
  {
    accessorKey: "creator",
    header: "Creator",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.getValue("date")).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: 'short',
      year: 'numeric',
    }),
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
    cell: ({ row }) => new Date(row.getValue("createdOn")).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: 'short',
      year: 'numeric',
    }),
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
    cell: ({  }) => {
      // const record = row.original
 
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
            <DropdownMenuItem
              onClick={() => {}}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
