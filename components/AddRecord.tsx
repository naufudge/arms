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

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be between 5 to 50 characters" }).max(50),
  subject: z.string(),
  description: z.string().min(10).max(500),
  creator: z.string().min(5).max(50),
  publisher: z.string(),
  contributor: z.string(),
  date: z.date(),
  type: z.string().min(5).max(50),
  format: z.string(),
  identifier: z.string(),
  source: z.string(),
  language: z.string(),
  relation: z.string(),
  coverage: z.string(),
  rights: z.string().min(5).max(50),
})


interface AddRecordProps {
  uploading: boolean;
  uploadFile: () => Promise<void>;
}

const AddRecord: React.FC<AddRecordProps> = ({ uploading, uploadFile }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    
    await uploadFile();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
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
          name="description"
          render={({ field }) => (
            <FormItem>
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
      
        <div className='grid grid-cols-2 gap-6'>
          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className='flex flex-col justify-start gap-1'>
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
              <FormItem className='flex flex-col justify-start gap-1'>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="Type" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className='grid grid-cols-2 gap-6'>
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
        </div>

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

        <Button type="submit" disabled={uploading}>Submit</Button>
      </form>
    </Form>
  )
}

export default AddRecord