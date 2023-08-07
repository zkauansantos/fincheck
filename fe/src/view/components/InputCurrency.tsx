import { NumericFormat } from "react-number-format";
import cn from "../../app/utils/cn";
import { CrossCircledIcon } from "@radix-ui/react-icons";
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
  return (
    <div>
      <NumericFormat
        thousandSeparator='.'
        decimalSeparator=','
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "text-[32px] text-gray-800 font-bold tracking-[-1px] outline-none w-full",
          error && "text-red-900"
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
