// components/DateRangePicker.tsx
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ dateRange, setDateRange }: DateRangePickerProps) {
  return (
    <DayPicker
      mode="range"
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={1} // 只显示一个月
      className="p-4 bg-white rounded-md shadow-md"
      footer={
        dateRange?.from && dateRange?.to
          ? `选中范围: ${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
          : "请选择时间范围"
      }
    />
  );
}
