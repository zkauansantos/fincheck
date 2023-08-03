import { CrossCircledIcon } from "@radix-ui/react-icons";
import cn from "../../app/utils/cn";
import { useState } from "react";
import formatDate from "../../app/utils/formatDate";
import { Popover } from "./Popover";
import DatePicker from "./DatePicker";

interface DatePickerInputProps {
  className?: string;
  error?: string;
}

export default function DatePickerInput({
  className,
  error,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type='button'
            className={cn(
              "bg-white w-full",
              "rounded-lg border border-gray-500 px-3 h-[52px] outline-none",
              "text-gray-700 pt-4  focus:border-gray-800 transition-all text-left relative",
              error && "!border-red-900",
              className
            )}
          >
            <span className='text-gray-700 text-xs absolute left-[13px] top-2 pointer-events-none'>
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            onChange={(date) => setSelectedDate(date)}
            value={selectedDate}
          />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className='flex items-center gap-2 mt-2 text-red-900'>
          <CrossCircledIcon />
          <span className='text-xs'>{error}</span>
        </div>
      )}
    </div>
  );
}
