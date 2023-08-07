import { ComponentProps } from "react";
import cn from "../../app/utils/cn";
import Spinner from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  variant?: 'danger' | 'ghost';
}

export default function Button({
  className,
  isLoading,
  children,
  disabled,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={cn(
        "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12",
        "rounded-2xl text-white font-medium disabled:text-gray-400",
        "disabled:cursor-not-allowed flex justify-center items-center",
        className,
        variant === 'danger' && "bg-red-900 hover:bg-red-800",
        variant === 'ghost' && "bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/1"
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner classname='w-6 h-6' />}
    </button>
  );
}
