import { useState } from "react";
import "./DatePicker.css";
import l, { getL } from "../../service/Localization.ts";

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
      <span>{getDateString(pickerDate)}</span>
      <button onClick={() => onDateAdd(pickerDate)}>&gt;</button>
      <button onClick={() => onDateToday(pickerDate)}>{l.today}</button>
    </div>
  );
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + 1000 * 60 * 60 * 24 * days);
}

function getDateString(date: Date) {
  return (
    getL("day_" + date.getDay()) +
    " " +
    date.getDate() +
    "." +
    (date.getMonth() + 1) +
    " " +
    date.getFullYear()
  );
}

export default DatePicker;
