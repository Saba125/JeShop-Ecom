import * as React from 'react';

import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
interface InputProps extends React.ComponentProps<'input'> {
    icon?: LucideIcon;
}
function Input({ className, type,icon: Icon, ...props }: InputProps) {
  return (
    <>
    <div className='relative'>
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      
      {...props}
      />
      {Icon && (
      

        <div className='absolute transition-all right-[10px] top-[9px]  right-0 top-0'>
            <Icon className="h-4 w-4" />
        </div>
      )}
    </div>
    </>
  );
}

export { Input };
