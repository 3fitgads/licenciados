import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 text-base",
        className
      )}
      style={{ fontSize: "16px" }}
      {...props}
    />
  );
});
