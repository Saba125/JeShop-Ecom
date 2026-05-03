"use client";

import { type LucideIcon, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";

interface FloatingButtonProps extends ComponentProps<typeof Button> {
  icon?: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function FloatingButton({
  icon: Icon = ShoppingCart,
  onClick,
  label,
  className,
  ...props
}: FloatingButtonProps) {
  return (
    <Button
    onClick={onClick}
      className={cn(
        "gap-2  rounded-xl font-medium text-sm animate-bounce-idle",
        className
      )}
      {...props}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );
}