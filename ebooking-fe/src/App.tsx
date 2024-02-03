import DatePicker from "./components/DatePicker/DatePicker";
import "./App.css";

function App() {
  function onDateChange(date: Date) {
    console.log(date);
    console.log(date.getDay());
    alert(date.getDate());
  }
  return (
    <>
      <div className="app">
        <text>ebooking</text>
        <DatePicker onDateChange={onDateChange}></DatePicker>
      </div>
    </>
  );
}

export default App;
