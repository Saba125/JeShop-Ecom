import React from 'react';
import { Loader2, type LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons';
import { Button } from '../ui/button';
import CFlex from '../ui/flex';

type ButtonProps = React.ComponentProps<typeof Button>;

interface CButtonProps extends ButtonProps {
    text?: string;
    icon?: LucideIcon | IconType;
    loading?: boolean;
}

export const CButton = ({ loading, text, icon: Icon, ...props }: CButtonProps) => {
    return (
        <Button {...props} disabled={loading || props.disabled}>
            <CFlex align='center' justify='center' gap='5px'>
                {loading && <Loader2 className="animate-spin" />}
                {Icon && <Icon />}
                {text}
            </CFlex>
        </Button>
    );
};
