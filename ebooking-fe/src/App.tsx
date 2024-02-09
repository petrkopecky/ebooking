import { useState } from "react";
import DatePicker from "./components/DatePicker/DatePicker";
import BookingTable from "./components/BookingTable/BookingTable";
import { BookingTableStructure, BookingSlot } from "./types/bookingTable.ts";
import "./App.css";
import bookingStructureJson from "./assets/bookingStructure.json";
import bookingSlotsJson from "./assets/bookingSlots.json";
import bookigTableStructureService from "./service/BookingTableStructureService.ts";
function App() {
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>(
    bookingSlotsJson as BookingSlot[]
  );

  const [bookingTableStructure, setBookingTableStructure] =
    useState<BookingTableStructure>(
      bookingStructureJson as BookingTableStructure
    );

  const [bookindDate, setBookingDate] = useState<Date>();

  function onDateChange(date: Date) {
    console.log(date);
    setBookingDate(date);
    setBookingSlots(bookingSlotsJson as BookingSlot[]);
    //setBookingTableStructure(bookingStructureJson as BookingTableStructure);
    bookigTableStructureService.getBookingTableStructure1().then((data) => {
      console.log("onDateChange-<geBookingTableStructure1");
      setBookingTableStructure(data);
    });
    console.log("onDateChange.");
  }

  //const bookingTableStructure: BookingTableStructure =bookingStructureJson as BookingTableStructure;
  //const bookingSlosts: BookingSlot[] = bookingSlotsJson as BookingSlot[];

  return (
    <>
      <div className="app">
        <span>ebooking</span>
        <DatePicker onDateChange={onDateChange}></DatePicker>
        <BookingTable
          bookingTableStructure={bookingTableStructure}
          bookingSlots={bookingSlots}
        ></BookingTable>
      </div>
    </>
  );
}

export default App;
