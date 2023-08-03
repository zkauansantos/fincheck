import { NumericFormat } from "react-number-format";
export default function InputCurrency() {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      defaultValue="0"
      className='text-[32px] text-gray-800 font-bold tracking-[-1px] outline-none w-full'
    />
  );
}
