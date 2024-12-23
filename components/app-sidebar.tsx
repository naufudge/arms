'use client';

import React, { useEffect } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Home, Search, Settings, Upload, Users } from 'lucide-react'
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import axios from 'axios';
import { UserTokenType } from '@/lib/MyTypes';

// Menu Items
const menuItems = [
    {
        title: "Home",
        url: "/",
        icon: Home
    },
    {
        title: "Search",
        url: "/search",
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
        url: "/settings",
        icon: Settings,
        items: [
            {title: "Manage User Roles", url: "/settings/roles"},
            {title: "Manage Collections", url: "/settings/collections"},
        ]
    },
]

export function AppSidebar() {
    const [user, setUser] = React.useState<UserTokenType>()

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get("/api/user/me")
                if (response.data.success) setUser(response.data.user)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message)
                } else {
                    console.error("An unknown error occurred.")
                }
            }
        }

        if (!user) getUser()
    }, [user])

    return (
        <Sidebar collapsible="icon" className='font-poppins'>
            <SidebarHeader />
            <SidebarContent>
                <NavMain items={menuItems} />
            </SidebarContent>
            <SidebarFooter>
                { user && <NavUser user={user} /> }
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
