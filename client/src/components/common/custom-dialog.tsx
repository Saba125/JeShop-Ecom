import React, { type JSXElementConstructor, type ReactElement } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { CButton } from './custom-button';
import { type LucideIcon } from 'lucide-react';
interface CDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string | ReactElement<unknown, string | JSXElementConstructor<any>>;
    width?: string;
    height?: string;
    description?: string | ReactElement<unknown, string | JSXElementConstructor<any>> | null;
    children?: React.ReactNode;
    onSubmit?: () => void;
    loading?: boolean;
    extraButton?: {
        render: boolean;
        text: string;
        onClick: () => void;
        variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
        icon: LucideIcon;
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
    extraButton,
}: CDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-none"
                style={{
                    maxWidth: width ?? '500px', // default width when none is passed
                }}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <CButton
                        variant="outline"
                        text="გაუქმება"
                        onClick={() => onOpenChange(false)} // Or directly closeDialog()
                    />
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
                            if (onSubmit) onSubmit();
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
