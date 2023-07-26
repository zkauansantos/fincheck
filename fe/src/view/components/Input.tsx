import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {}

export default function Input({ placeholder, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      <input
      id=""
        {...props}
        className='
       bg-white
         w-full
         rounded-lg
         border
       border-gray-500
         px-3
         h-[52px]
         text-gray-800
       '
      />
      <label className="absolute left-[14px] top-3.5" htmlFor="input">{placeholder}</label>
    </div>
  );
}
