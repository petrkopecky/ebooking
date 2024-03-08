import { useEffect, useState } from "react";
import DatePicker from "../DatePicker/DatePicker.tsx";
import {
  BookingTableStructure,
  BookingSlot,
} from "../../types/bookingTable.ts";
import bookingService from "../../service/BookingService.ts";
import BookingTable from "../BookingTable/BookingTable.tsx";
import "./Booking.css";

function Booking() {
  const [spin, setSpin] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
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
        console.log("getBookingTableStructure1 data:" + data);
        setBookingTableStructure(data);
      }),
      bookingService.getBookingDateSlots(bookingDate).then((data) => {
        console.log("getBookingDateSlots data:" + data);
        setBookingSlots(data);
      }),
    ])
      .catch((error) => {
        console.log(error);
        setError(true);
        setErrorMessage(error.message);
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
        <div className="booking">
          <p>ebooking</p>
          {spin && <p>Loading</p>}

          {ready && (
            <div>
              <DatePicker
                onDateChange={(date) => {
                  onDateChange(date);
                }}
                initialDate={bookingDate}
              ></DatePicker>

              <div>
                <BookingTable
                  bookingDate={bookingDate}
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

export default Booking;
