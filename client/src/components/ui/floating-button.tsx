;

import { useState } from "react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AddAllToCartButtonProps {
  itemCount?: number;
  onAddAll: () => Promise<void>;
  className?: string;
}

export function AddAllToCartButton({
  itemCount = 0,
  onAddAll,
  className,
}: AddAllToCartButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const handleClick = async () => {
    if (state !== "idle") return;
    setState("loading");
    await onAddAll();
    setState("success");
    setTimeout(() => setState("idle"), 2500);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={state === "loading"}
      className={cn(
        "relative gap-2 px-6 h-12 rounded-xl font-medium text-sm",
        // idle bounce
        state === "idle" && "animate-bounce-idle",
        // success green
        state === "success" && "bg-green-700 hover:bg-green-700",
        className
      )}
    >
      {state === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
      {state === "success" && <Check className="h-4 w-4 animate-in zoom-in-50 duration-300" />}
      {state === "idle" && <ShoppingCart className="h-4 w-4" />}

      {state === "loading" && "Adding..."}
      {state === "success" && `${itemCount} items added!`}
      {state === "idle" && "Add all to cart"}
    </Button>
  );
}