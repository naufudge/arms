import React, { Dispatch, SetStateAction } from 'react';
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from "@/components/ui/calendar";
import { FilterIcon } from 'lucide-react';
import { Collection, User } from '@prisma/client';
import { FilterDataType } from '@/lib/MyTypes';
import { capitalizeFirstLetter } from '@/utils/Helpers';


interface FilterProps {
    collections: Collection[] | undefined | null;
    users: User[] | undefined;
    filterData: FilterDataType;
    setFilterData: Dispatch<SetStateAction<FilterDataType>>;
}

const Filter: React.FC<FilterProps> = ({ collections, users, filterData, setFilterData }) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className='h-full'><FilterIcon /> Filter</Button>
            </PopoverTrigger>
            <PopoverContent className='text-sm w-96' align='end' >
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Filter Records</h4>
                        <p className="text-sm text-muted-foreground">
                            Filter records by metadata.
                        </p>
                    </div>

                    <div className="grid gap-5">
                        <div className='grid grid-cols-2 gap-5'>
                            {/* Title */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="width">Title</Label>
                                <Input
                                    id="title"
                                    placeholder='Title'
                                    className="h-8"
                                    onChange={(e) => setFilterData({ ...filterData, title: e.target.value })}
                                />
                            </div>

                            {/* Creator */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="width">Creator</Label>
                                <Input
                                    id="creator"
                                    placeholder='Creator'
                                    className="h-8"
                                    onChange={(e) => setFilterData({ ...filterData, creator: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-5'>
                            {/* Uploaded Date */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="width">Uploaded by</Label>
                                <Select disabled={!users} onValueChange={(value) => setFilterData({ ...filterData, user: value })}>
                                    <SelectTrigger id='user' className="w-full">
                                        <SelectValue placeholder="Select User" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users?.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.username}
                                                className='hover:cursor-pointer'
                                            >{capitalizeFirstLetter(user.username)}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Collection */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="width">Collection</Label>
                                <Select disabled={!collections} onValueChange={(value) => setFilterData({ ...filterData, collection: value })}>
                                    <SelectTrigger id='collection' className="w-full">
                                        <SelectValue placeholder="Select Collection" />
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
                        </div>

                        <div className='grid grid-cols-2 gap-5'>
                            {/* Record Date */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="width">Record Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !filterData.date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            {filterData.date ? format(filterData.date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align='end'>
                                        <Calendar
                                            mode="single"
                                            // captionLayout='dropdown'
                                            // fromYear={1900}
                                            // toYear={2025}
                                            selected={filterData.date}
                                            onSelect={(e) => setFilterData({...filterData, date: e})}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Upload Date */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="width">Upload Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !filterData.uploaded && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-1 h-3 w-3" />
                                            {filterData.uploaded ? format(filterData.uploaded, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align='end'>
                                        <Calendar
                                            mode="single"
                                            // captionLayout='dropdown'
                                            // fromYear={1900}
                                            // toYear={2025}
                                            selected={filterData.uploaded}
                                            onSelect={(e) => setFilterData({...filterData, uploaded: e})}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>   
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <Button className='w-fit'>Filter</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default Filter