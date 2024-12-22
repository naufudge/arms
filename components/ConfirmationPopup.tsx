import React, { Dispatch, SetStateAction } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogContentProps } from '@radix-ui/react-alert-dialog';

interface ConfirmationPopupProps extends AlertDialogContentProps {
    open: boolean; 
    setOpen: Dispatch<SetStateAction<boolean>>;
    description: string;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ open, setOpen, description, ...props }) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent {...props}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
                    
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default ConfirmationPopup