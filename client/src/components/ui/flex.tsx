import React from "react";
import clsx from "clsx";

interface CFlexProps {
  direction?: "row" | "col";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  align?: "start" | "center" | "end" | "between" | "around" | "evenly";
  gap?: string
  children?: React.ReactNode;
  className?: string;
}

const CFlex = ({
  direction = "row",
  justify = "start",
  align = "start",
  gap = "0",
  children,
  className,
}: CFlexProps) => {
  return (
    <div
    style={{gap}}
      className={clsx(
        "flex",
        {
          [`flex-${direction}`]: direction,
          [`justify-${justify}`]: justify,
          [`items-${align}`]: align,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default CFlex;
