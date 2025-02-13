import * as React from "react";
import { cn } from "../../utils/cn";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-[#FFA726]/20 bg-white shadow-sm transition-shadow duration-200",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export { Card, CardContent };