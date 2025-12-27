import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export default function DatePicker({ onChange, value }: DatePickerProps) {
  return (
    <DayPicker
      selected={value}
      mode='single'
      onSelect={(date) => onChange(date ?? new Date())}
      timeZone="America/Sao_Paulo"
      classNames={{
        month_caption: "flex items-center justify-between text-gray-900 tracking-[-0.408px] font-medium capitalize",
        nav: "flex gap-1",
        button_previous:
          "text-teal-800 flex items-center justify-center !bg-transparent",
        button_next:
          "text-teal-800 flex items-center justify-center !bg-transparent",
        weekday: "uppercase text-xs text-gray-500 font-medium pt-1 pb-2",
        day_button:
          "text-gray-700 cursor-pointer w-10 h-10 hover:bg-teal-100 rounded-full",
        today: "bg-gray-100 font-bold text-gray-900",
        selected: "!bg-teal-900 text-white font-medium",
      }}
      formatters={{
        formatMonthCaption: (date) => {
          return format(date, "LLLL yyyy", { locale: ptBR });
        },
        formatWeekdayName: (date) => {
          return format(date, "EEE", { locale: ptBR });
        },
      }}
    />
  );
}
