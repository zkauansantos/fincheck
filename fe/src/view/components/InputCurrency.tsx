import cn from '@/app/utils/cn';
import { CrossCircledIcon } from '@radix-ui/react-icons';
interface InputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?: (value: string) => void;
}

export default function InputCurrency({
  error,
  onChange,
  value,
}: InputCurrencyProps) {
  const removeNonNumeric = (value?: string) => {
    if (!value) return '';
    return Number(value.replace(/[^0-9]/g, ''));
  };

  const formatCurrency = (value?: number) => {
    if (!value) return '';

    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          const numericValue = removeNonNumeric(value);
          onChange?.(formatCurrency(Number(numericValue)));
        }}
        className={cn(
          'text-[32px] text-gray-800 font-bold tracking-[-1px] outline-none w-full',
          error && 'text-red-900'
        )}
      />

      {error && (
        <div className='flex items-center gap-2 mt-2 text-red-900'>
          <CrossCircledIcon />
          <span className='text-xs'>{error}</span>
        </div>
      )}
    </div>
  );
}
