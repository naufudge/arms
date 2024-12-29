import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"

interface DashboardCardTypes {
    title: string;
    icon: React.JSX.Element;
    content: string | undefined;
}

const DashboardCard: React.FC<DashboardCardTypes> = ({ title, icon, content }) => {
  return (
    <Card>
        <CardHeader>
            <div className="flex justify-between w-full">
                <h3 className="font-light">{title}</h3>
                <div className=''>{icon}</div>
            </div>
        </CardHeader>
        <CardContent><div className="font-bold text-xl">{content}</div></CardContent>
    </Card>
  )
}

export default DashboardCard