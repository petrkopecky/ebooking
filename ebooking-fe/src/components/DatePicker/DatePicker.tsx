import { useState } from "react";
import "./DatePicker.css";

interface DatePickerProps {
  date?: Date;
  onDateChange(date: Date): void;
}

function DatePicker({ onDateChange, date }: DatePickerProps) {
  const [pickerDate, setPickerDate] = useState<Date>(date ?? new Date());

  function onDateSub(date: Date) {
    setPickerDate(addDays(date, -1));
    onDateChange(pickerDate);
  }

  function onDateAdd(date: Date) {
    setPickerDate(addDays(date, 1));
    onDateChange(pickerDate);
  }

  function onDateToday(date: Date) {
    setPickerDate(new Date());
    onDateChange(pickerDate);
  }

  return (
    <div>
      <button onClick={() => onDateSub(pickerDate)}>&lt;</button>
      <span>{pickerDate.toDateString()}</span>
      <button onClick={() => onDateAdd(pickerDate)}>&gt;</button>
      <button onClick={() => onDateToday(pickerDate)}>today</button>
    </div>
  );
}

function addDays(date: Date, days: number): Date {
  date.setDate(date.getDate() + days);
  return new Date(date);
}

export default DatePicker;
