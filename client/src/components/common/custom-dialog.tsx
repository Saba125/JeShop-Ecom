import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import clsx from 'clsx';
import { CButton } from './custom-button';

interface CDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    width?: string;
    description?: string;
    children?: React.ReactNode;
    onSubmit?: () => void;
    loading?: boolean;
}

const CDialog = ({
    open,
    onOpenChange,
    title,
    description,
    children,
    onSubmit,
    width,
    loading,
}: CDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={clsx('sm:max-w-[500px]', width && `sm:max-w-[${width}]`)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <DialogClose asChild>
                        <CButton variant="outline" text="გაუქმება" />
                    </DialogClose>
                    <CButton
                        type="submit"
                        onClick={() => {
                            onOpenChange(false)
                            onSubmit?.();
                        }}
                        loading={loading}
                        text="შენახვა"
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CDialog;
