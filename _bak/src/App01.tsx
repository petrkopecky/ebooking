import { useEffect, useState } from "react";
import DatePicker from "./components/DatePicker/DatePicker.tsx";
import "./App.css";
import { BookingTableStructure, BookingSlot } from "./types/bookingTable.ts";
import bookingService from "./service/BookingService.ts";
import BookingTable from "./components/BookingTable/BookingTable";

function App() {
  const initialDate = new Date();
  const [spin, setSpin] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<Date>(new Date(initialDate));
  const [bookingTableStructure, setBookingTableStructure] =
    useState<BookingTableStructure>();
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>();

  useEffect(() => {
    console.log("use effect");
  }, []);

  useEffect(() => {
    console.log("use effect bookingDate:" + bookingDate.toDateString());
    setDate(bookingDate);
  }, [bookingDate]);
  function setDate(date: Date) {
    setError(false);
    setReady(false);
    setSpin(true);
    Promise.all([
      bookingService.getBookingTableStructure1().then((data) => {
        setBookingTableStructure(data);
      }),
      bookingService.getBookingDateSlots().then((data) => {
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
      "onDateChange" + bookingDate.toDateString() + "  " + date.toDateString()
    );
    setBookingDate(date);
  }

  if (error) {
    return <div>{errorMessage}</div>;
  } else {
    return (
      <>
        {error && <div>{errorMessage}</div>}
        <div className="app">
          <span>ebooking</span>
          {spin && <p>Loading</p>}

          <div>
            <DatePicker
              onDateChange={(date) => {
                onDateChange(date);
              }}
              initialDate={initialDate}
            ></DatePicker>
            {ready && (
              <div>
                <BookingTable
                  bookingTableStructure={bookingTableStructure}
                  bookingSlots={bookingSlots}
                ></BookingTable>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
