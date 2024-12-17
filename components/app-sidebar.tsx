'use client';

import React, { useState } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { title } from 'process'
import { Home, Search, Settings, Upload, Users } from 'lucide-react'
import { UserPublic } from '@/lib/MyTypes';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

// Menu Items
const menuItems = [
    {
        title: "Home",
        url: "/",
        icon: Home
    },
    {
        title: "Search",
        url: "/",
        icon: Search
    },
    {
        title: "Upload",
        url: "/upload",
        icon: Upload
    },
    {
        title: "Users",
        url: "/users",
        icon: Users
    },
    {
        title: "Settings",
        url: "/",
        icon: Settings
    },
]

export function AppSidebar() {
    const [user, setUser] = useState<UserPublic>({
        username: "Nauf",
        email: "nauf@gmail.com",
        userRole: "Admin",
        avatar: ""
    })

    return (
        <Sidebar collapsible="icon" className='font-poppins'>
            <SidebarHeader />
            <SidebarContent>
                {/* <SidebarGroup>
                    <SidebarGroupLabel>ARMS</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup> */}
                <NavMain items={menuItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
