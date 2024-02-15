import { useEffect, useState } from "react";
import DatePicker from "./components/DatePicker/DatePicker";
import BookingTable from "./components/BookingTable/BookingTable";
import { BookingTableStructure, BookingSlot } from "./types/bookingTable.ts";
import "./App.css";
import bookingStructureJson from "./assets/bookingStructure.json";
import bookingSlotsJson from "./assets/bookingSlots.json";
import bookingService from "./service/BookingService.ts";
function App() {
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>(
    bookingSlotsJson as BookingSlot[]
  );

  const [spin, setSpin] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  //const [bookingTableStructure, setBookingTableStructure] = useState<BookingTableStructure>(bookingStructureJson as BookingTableStructure);
  const [bookingTableStructure, setBookingTableStructure] =
    useState<BookingTableStructure>();
  const [bookingDate, setBookingDate] = useState<Date>();

  useEffect(() => {
    console.log("use effect");
    //setDate(new Date(new Date().setDate(new Date().getDate() - 10)));
  }, []);

  useEffect(() => {
    console.log("use effect booking date");
    setDate(bookingDate);
  }, [bookingDate]);
  function setDate(date?: Date) {
    setError(false);
    setReady(false);
    setSpin(true);
    console.log(date);
    //setBookingDate(date);
    //setBookingSlots(bookingSlotsJson as BookingSlot[]);
    Promise.all([
      bookingService.getBookingTableStructure1().then((data) => {
        //console.log("onDateChange-<geBookingTableStructure1");
        setBookingTableStructure(data);
      }),
      bookingService.getBookingDateSlots().then((data) => {
        //console.log("onDateChange-<geBookingDateSlot");
        setBookingSlots(data);
      }),
    ])
      .catch((error) => {
        console.log(`setDate error: ${error}`);
        setError(true);
        setErrorMessage("Error occured:");
      })
      .finally(() => {
        setSpin(false);
        setReady(!error);
      });
  }

  function onDateChange(date: Date) {
    console.log(
      "onDateChange" + bookingDate?.toDateString() + "  " + date.toDateString()
    );
    //setDate(date);
    setBookingDate(date);
  }

  //const bookingTableStructure: BookingTableStructure =bookingStructureJson as BookingTableStructure;
  //const bookingSlosts: BookingSlot[] = bookingSlotsJson as BookingSlot[];
  if (error) {
    return <div>{errorMessage}</div>;
  } else {
    return (
      <>
        {/*console.log("app render")*/}
        {error && <div>{errorMessage}</div>}
        <div className="app">
          <span>ebooking</span>
          {spin && <p>Loading</p>}
          {ready && (
            <div>
              <p>ready</p>
              <DatePicker
                onDateChange={onDateChange}
                date={bookingDate}
              ></DatePicker>
              <div>
                <BookingTable
                  bookingTableStructure={bookingTableStructure}
                  bookingSlots={bookingSlots}
                ></BookingTable>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default App;
