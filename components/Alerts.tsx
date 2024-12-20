import { CircleCheck, CircleX } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface AlertBarProps extends React.HTMLProps<HTMLDivElement> {
    // variant?: "default" | "destructive" | null | undefined;
    alertType: "success" | "error"
    description: string;
    title: string;
}

export function AlertBar({ title, description, alertType, ...props }: AlertBarProps) {
    if (alertType === "error") {
        return (
        <Alert variant={"destructive"} {...props}>
            <CircleX className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
            {description}
            </AlertDescription>
        </Alert>
        )
    } else if (alertType === "success") {
        return ( 
            <Alert variant={"success"} {...props}>
                <CircleCheck className="h-4 w-4" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                {description}
                </AlertDescription>
            </Alert>
        )
    }
}