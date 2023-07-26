import { ComponentProps, forwardRef } from "react";

import { CrossCircledIcon } from "@radix-ui/react-icons";

import cn from "../../app/utils/cn";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, id, name, error, className, ...props }, ref) => {
    return (
      <div className='relative'>
        <input
          {...props}
          id={id ?? name}
          name={name}
          placeholder=' '
          ref={ref}
          className={cn(
            "bg-white placeholder-shown:pt-0 focus:pt-4 w-full pt-4",
            "rounded-lg border border-gray-500 px-3 h-[52px] outline-none",
            "text-gray-800 peer focus:border-gray-800 transition-all",
            error && "!border-red-900",
            className
          )}
        />

        <label
          htmlFor={id ?? name}
          className={cn(
            "absolute text-xs left-[14px] top-2 pointer-events-none",
            "text-gray-700 peer-placeholder-shown:text-base",
            "peer-placeholder-shown:top-3.5 transition-all",
            "peer-focus:top-2 peer-focus:text-xs"
          )}
        >
          {placeholder}
        </label>

        {error && (
          <div className='flex items-center gap-2 mt-2 text-red-900'>
            <CrossCircledIcon />
            <span className='text-xs'>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
