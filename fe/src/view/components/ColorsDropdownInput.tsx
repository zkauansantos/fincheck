import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import cn from "../../app/utils/cn";
import { DropdownMenu } from "./DropdownMenu";
import { COLORS } from "../../app/config/constants";
import { ColorIcon } from "./icons/ColorIcon";
import { useState } from "react";

interface ColorsDropdownInputProps {
  className?: string;
  error?: string;
}

type Color = {
  color: string;
  bg: string;
};

export default function ColorsDropdownInput({
  className,
  error,
}: ColorsDropdownInputProps) {
  const [selectedColor, setSelectedColor] = useState<null | Color>(null);

  function handleSelect(color: Color) {
    setSelectedColor(color);
  }

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            className={cn(
              "bg-white w-full ",
              "rounded-lg border border-gray-500 px-3 h-[52px] outline-none",
              "text-gray-800  focus:border-gray-700 transition-all text-left relative",
              error && "!border-red-900",
              className
            )}
          >
            Cor
            <div className=' text-gray-800 absolute right-3 top-1/2 -translate-y-1/2'>
              {!selectedColor && <ChevronDownIcon className='w-6 h-6' />}
              {selectedColor && (
                <ColorIcon color={selectedColor.color} bg={selectedColor.bg} />
              )}
            </div>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className='grid grid-cols-4'>
          {COLORS.map(({ bg, color }) => (
            <DropdownMenu.Item
              key={color}
              onSelect={() => handleSelect({ color, bg })}
            >
              <ColorIcon bg={bg} color={color} />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {error && (
        <div className='flex items-center gap-2 mt-2 text-red-900'>
          <CrossCircledIcon />
          <span className='text-xs'>{error}</span>
        </div>
      )}
    </div>
  );
}
