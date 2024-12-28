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
import { User } from '@prisma/client';

interface ConfirmationPopupProps extends AlertDialogContentProps {
    open: boolean; 
    setOpen: Dispatch<SetStateAction<boolean>>;
    description: string;
    user?: User;
    proceed: () => Promise<void>;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ open, setOpen, description, user, proceed, ...props }) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent {...props}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {
                        user ? 
                            <AlertDialogAction onClick={() => proceed()}>
                                Continue
                            </AlertDialogAction>
                    :
                    <AlertDialogAction onClick={proceed}>
                        Continue
                    </AlertDialogAction>
                }
                </AlertDialogFooter>
                    
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default ConfirmationPopup