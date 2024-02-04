import DatePicker from "./components/DatePicker/DatePicker";
import "./App.css";

function App() {
  function onDateChange(date: Date) {
    console.log(date);
    console.log(date.getDay());
  }
  return (
    <>
      <div className="app">
        <span>ebooking</span>
        <DatePicker onDateChange={onDateChange}></DatePicker>
        <DatePicker onDateChange={onDateChange}></DatePicker>
        <DatePicker onDateChange={onDateChange}></DatePicker>
      </div>
    </>
  );
}

export default App;
