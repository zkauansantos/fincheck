import cn from '@/app/utils/cn';
import formatDate from '@/app/utils/formatDate';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import DatePicker from './DatePicker';
import { Popover } from './Popover';

interface DatePickerInputProps {
  className?: string;
  error?: string;
  value?: Date;
  onChange: (date: Date) => void;
}

export default function DatePickerInput({
  className,
  error,
  value,
  onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type='button'
            className={cn(
              'bg-white w-full',
              'rounded-lg border border-gray-500 px-3 h-[52px] outline-none',
              'text-gray-700 pt-4  focus:border-gray-800 transition-all text-left relative',
              error && 'border-red-900!',
              'dark:border-gray-300 dark:bg-gray-100',
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
            onChange={(date) => handleChangeDate(date)}
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
