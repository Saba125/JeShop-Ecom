import React, { type JSXElementConstructor, type ReactElement } from 'react';
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
import { icons, type LucideIcon } from 'lucide-react';
interface CDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string | ReactElement<unknown, string | JSXElementConstructor<any>>;
    width?: string;
    description?: string | ReactElement<unknown, string | JSXElementConstructor<any>> | null;
    children?: React.ReactNode;
    onSubmit?: () => void;
    loading?: boolean;
    extraButton?: {
        render: boolean;
        text: string;
        onClick: () => void;
        variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
        icon: LucideIcon
    };
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
    extraButton
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
                    {extraButton?.render && (
                        <CButton
                            type="button"
                            onClick={extraButton.onClick}
                            text={extraButton.text}
                            variant={extraButton.variant}
                            icon={extraButton.icon}
                        />
                    )}
                    <CButton
                        type="submit"
                        onClick={() => {
                            console.log(`i am called`);
                            onOpenChange(false);
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
