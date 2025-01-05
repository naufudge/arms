"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from 'axios'
import { recordFormSchema, UserTokenType } from '@/lib/MyTypes'
import { UploadResponse } from 'pinata'


interface AddRecordProps {
  uploading: boolean;
  uploadFile: () => Promise<UploadResponse | undefined>;
  selectedCollectionId: number;
  user: UserTokenType | undefined;
}

const AddRecord: React.FC<AddRecordProps> = ({ uploading, uploadFile, selectedCollectionId, user }) => {
  const form = useForm<z.infer<typeof recordFormSchema>>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: {
      title: "",
      subject: "",
      description: "",
      creator: "",
      publisher: "",
      contributor: "",
      date: new Date(),
      type: "",
      format: "",
      identifier: "",
      source: "",
      language: "",
      relation: "",
      coverage: "",
      rights: ""
    },
  })

  async function onSubmit(values: z.infer<typeof recordFormSchema>) {
    if (!user || !selectedCollectionId) {
      alert("User not logged in.")
      return
    }

    const uploadResponse = await uploadFile();

    if (uploadResponse) {
      const recordData = {
        ...values,
        date: new Date(values.date),
        // fileId: uploadResponse,
        collectionId: selectedCollectionId,
        userId: user.id
      }

      const response = await axios.post("/api/record", { recordData, uploadResponse })
      console.log(response)

      if (response.data.success) {
        alert("Record added successfully.")
      } else {
        alert("Failed to add record.")
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Creator</FormLabel>
                <FormControl>
                  <Input placeholder="Creator" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher</FormLabel>
                <FormControl>
                  <Input placeholder="Publisher" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className='col-span-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contributor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contributor</FormLabel>
                <FormControl>
                  <Input placeholder="Contributor" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Type" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Format */}
          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Format</FormLabel>
                <FormControl>
                  <Input placeholder="Format" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Identifier */}
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identifier</FormLabel>
                <FormControl>
                  <Input placeholder="Identifier" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Source */}
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
                <FormControl>
                  <Input placeholder="Source" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Language */}
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input placeholder="Language" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Relation */}
          <FormField
            control={form.control}
            name="relation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relation</FormLabel>
                <FormControl>
                  <Input placeholder="Relation" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Coverage */}
          <FormField
            control={form.control}
            name="coverage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coverage</FormLabel>
                <FormControl>
                  <Input placeholder="Coverage" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rights */}
          <FormField
            control={form.control}
            name="rights"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rights</FormLabel>
                <FormControl>
                  <Input placeholder="Rights" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button name='submit' type="submit" disabled={uploading}>Submit</Button>
      </form>
    </Form>
  )
}

export default AddRecord