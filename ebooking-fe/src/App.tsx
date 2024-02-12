import { useEffect, useState } from "react";
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

  const [spin, setSpin] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(true);
  //const [bookingTableStructure, setBookingTableStructure] = useState<BookingTableStructure>(bookingStructureJson as BookingTableStructure);
  const [bookingTableStructure, setBookingTableStructure] =
    useState<BookingTableStructure>();
  const [bookingDate, setBookingDate] = useState<Date>();

  useEffect(() => {
    setDate(new Date());
  }, [bookingDate]);
  function setDate(date: Date) {
    setSpin(true);
    console.log(date);
    // setBookingDate(date);
    setBookingSlots(bookingSlotsJson as BookingSlot[]);
    //setBookingTableStructure(bookingStructureJson as BookingTableStructure);
    bookigTableStructureService
      .getBookingTableStructure1()
      .then((data) => {
        console.log("onDateChange-<geBookingTableStructure1");
        setBookingTableStructure(data);
      })
      .finally(() => {
        setSpin(false);
      });
    console.log("onDateChange.");
  }

  function onDateChange(date: Date) {
    setBookingDate(date);
  }

  //const bookingTableStructure: BookingTableStructure =bookingStructureJson as BookingTableStructure;
  //const bookingSlosts: BookingSlot[] = bookingSlotsJson as BookingSlot[];

  return (
    <>
      <div className="app">
        <span>ebooking</span>
        <DatePicker onDateChange={onDateChange} date={bookingDate}></DatePicker>
        {ready && "aaassa"}
        aaaa
        {spin && <p>Loading</p>}
        {ready && <p>ready</p>}
        <p>aaa</p>
        {ready && (
          <div>
            <p>xxx</p>
            <BookingTable
              bookingTableStructure={bookingTableStructure}
              bookingSlots={bookingSlots}
            ></BookingTable>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
