import "./DatePicker.css";
interface DatePickerProps {
  onDateChange(date: Date): void;
}

function DatePicker({ onDateChange }: DatePickerProps) {
  let pickerDate: Date = new Date();
  return (
    <div>
      <button onClick={() => onDateChange(pickerDate)}>&lt;</button>
      <text>{pickerDate.toDateString()}</text>
      <button>&gt;</button>
      <button>today</button>
    </div>
  );
}

export default DatePicker;
