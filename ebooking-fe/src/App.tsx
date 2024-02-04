import DatePicker from "./components/DatePicker/DatePicker";
import BookingTable from "./components/BookingTable/BookingTable";
import { BookingTableStructure } from "./types/bookingTableStructure.ts";
import "./App.css";
import bookingStructureJson from "./assets/bookingStructure.json";

function App() {
  function onDateChange(date: Date) {
    console.log(date);
  }

  const bookingTableStructure: BookingTableStructure =
    bookingStructureJson as BookingTableStructure;
  console.log(bookingTableStructure);

  return (
    <>
      <div className="app">
        <span>ebooking</span>
        <DatePicker onDateChange={onDateChange}></DatePicker>
        <BookingTable
          bookingTableStructure={bookingTableStructure}
        ></BookingTable>
      </div>
    </>
  );
}

export default App;
