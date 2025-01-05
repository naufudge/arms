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
    <Card className='h-[120px]'>
        <CardHeader>
            <div className="flex justify-between md:flex-col lg:flex-row">
                <h3 className="font-light text-sm md:text-md">{title}</h3>
                <div className='size-5'>{icon}</div>
            </div>
        </CardHeader>
        <CardContent><div className="font-bold text-xl">{content}</div></CardContent>
    </Card> 
  )
}

export default DashboardCard