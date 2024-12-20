'use client';

import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Home, Search, Settings, Upload, Users } from 'lucide-react'
// import { UserPublic } from '@/lib/MyTypes';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

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
        icon: Settings
    },
]

export function AppSidebar() {
    // const [user, setUser] = useState<UserPublic>({
    //     username: "Nauf",
    //     email: "nauf@gmail.com",
    //     userRole: "Admin",
    //     avatar: ""
    // })

    const user = {
        username: "Nauf",
        email: "nauf@gmail.com",
        userRole: "Admin",
        avatar: ""
    }

    return (
        <Sidebar collapsible="icon" className='font-poppins'>
            <SidebarHeader />
            <SidebarContent>
                <NavMain items={menuItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
