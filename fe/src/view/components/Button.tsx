import { ComponentProps } from "react";
import cn from "../../app/utils/cn";
import Spinner from "./Spinner";

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
}

export default function Button({
  className,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={isLoading || disabled}
      {...props}
      className={cn(
        className,
        "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12",
        "rounded-2xl text-white font-medium disabled:text-gray-400",
        "disabled:cursor-not-allowed flex justify-center items-center"
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner classname='w-6 h-6' />}
    </button>
  );
}
