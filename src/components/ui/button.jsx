import { cn } from "@/lib/utils";
import React from "react";

export const Button = React.forwardRef(function Button({ 
  children, 
  variant = "primary", 
  className, 
  ...props 
}, ref) {
  const variants = {
    primary: "bg-primary text-white border-primary hover:bg-primary-dark",
    outline: "bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50",
    white: "bg-white text-primary border-white hover:bg-gray-50",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "flex items-center justify-center px-5 py-2.5 rounded-lg font-semibold transition-colors border outline-none uppercase text-sm",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
