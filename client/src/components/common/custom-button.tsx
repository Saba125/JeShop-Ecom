import React from 'react';
import type { LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons';
import { Button } from '../ui/button';

type ButtonProps = React.ComponentProps<typeof Button>;

interface CButtonProps extends ButtonProps {
  text?: string; 
  icon?: LucideIcon | IconType;
}

export const CButton = ({ text, icon: Icon, ...props }: CButtonProps) => {
  return (
    <Button {...props}>
      {Icon && <Icon  />}
      {text}
    </Button>
  );
};
