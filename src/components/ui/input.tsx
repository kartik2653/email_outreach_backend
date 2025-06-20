import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `focus:outline-none 
           border-[1px]
           border-gray-300
           focus:border-yellow-green
           focus:bg-white
           hover:border-[1px]
           hover:border-yellow-green
           hover:bg-light-yellow-green
           font-manrope flex h-12 w-full 
           rounded-standard
           px-3 
           py-2 
           disabled:opacity-50 
           md:text-sm`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
