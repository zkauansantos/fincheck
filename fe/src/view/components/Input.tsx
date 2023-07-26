import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  name: string;
}

export default function Input({ placeholder, id, name, ...props }: InputProps) {
  return (
    <div className='relative'>
      <input
        {...props}
        id={id ?? name}
        name={name}
        className='bg-white placeholder-shown:pt-0 focus:pt-4 w-full pt-4 rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 peer focus:border-gray-800 transition-all outline-none'
        placeholder=' '
      />

      <label
        htmlFor={id ?? name}
        className='absolute text-xs left-[14px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all peer-focus:top-2 peer-focus:text-xs'
      >
        {placeholder}
      </label>
    </div>
  );
}
