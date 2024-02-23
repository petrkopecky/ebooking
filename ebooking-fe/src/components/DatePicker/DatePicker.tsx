import { useState } from "react";
import "./DatePicker.css";

interface DatePickerProps {
  initialDate?: Date;
  onDateChange(date: Date): void;
}

function DatePicker({ onDateChange, initialDate }: DatePickerProps) {
  const [pickerDate, setPickerDate] = useState<Date>(initialDate ?? new Date());
  console.log("datepicker initial " + initialDate?.toDateString());
  function onDateSub(date: Date) {
    let newDate = addDays(date, -1);
    setPickerDate(newDate);
    onDateChange(newDate);
  }

  function onDateAdd(date: Date) {
    let newDate = addDays(date, 1);
    setPickerDate(newDate);
    onDateChange(newDate);
  }

  function onDateToday(date: Date) {
    let newDate = new Date(new Date().setHours(0, 0, 0, 0));
    setPickerDate(newDate);
    onDateChange(newDate);
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
  return new Date(date.getTime() + 1000 * 60 * 60 * 24 * days);
}

export default DatePicker;
