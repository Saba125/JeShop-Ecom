import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import clsx from 'clsx';

interface CDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    width?:string;
    description?: string;
    children?: React.ReactNode;
    onSubmit?: () => void;
}

const CDialog = ({ open, onOpenChange, title, description, children, onSubmit,width }: CDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={clsx("sm:max-w-[500px]", width && `sm:max-w-[${width}]` )}>
            <DialogHeader>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            {children}
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">გაუქმება</Button>
                </DialogClose>
                <Button type="submit" onClick={onSubmit}>შენახვა</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default CDialog