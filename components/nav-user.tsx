"use client"

import {
    Bell,
    ChevronsUpDown,
    LogOut,
    User as UserIcon,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import axios from "axios"
import { UserTokenType } from "@/lib/MyTypes"

export function NavUser({
    user,
}: {
    user: UserTokenType
}) {
    const { isMobile } = useSidebar()

    const handleLogout = async () => {
        try {
            const response = await axios.get("/api/user/logout")

            if (response.data.success) {
                location.reload()
            } else {
                console.log("Failed to log out.")
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message)
            } else {
                console.error("An unknown error occurred.")
            }
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src="" alt={user.username} />
                                <AvatarFallback className="rounded-lg">{user.username[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.username}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">

                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src="" alt={user.username} />
                                    <AvatarFallback className="rounded-lg">{user.username[0].toUpperCase()}</AvatarFallback>
                                </Avatar>

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.username}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                            className="hover:cursor-pointer"
                            >
                                <UserIcon />
                                Profile
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem
                            className="hover:cursor-pointer"
                            >
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                        className="hover:cursor-pointer hover:bg-red-50 hover:text-red-500 text-red-500 font-semibold transtion-all duration-200"
                        onClick={handleLogout}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
