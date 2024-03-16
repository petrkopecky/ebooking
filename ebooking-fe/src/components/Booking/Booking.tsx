import { useEffect, useState } from "react";
import DatePicker from "../DatePicker/DatePicker.tsx";
import {
  BookingTableStructure,
  BookingSlot,
} from "../../types/bookingTable.ts";
import bookingService from "../../service/BookingService.ts";
import BookingTable from "../BookingTable/BookingTable.tsx";
import BookingSlotForm from "../BookingSlotForm/BookingSlotForm.tsx";
import "./Booking.css";
import { formModes } from "../../types/formMode.ts";

enum editModes {
  "TABLE",
  "NEWBOOKING",
}

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
  const [editMode, setEditMode] = useState<editModes>(editModes.TABLE);
  const [editBookingSlotKey, setEditBookingSlotKey] = useState<string>("");

  useEffect(() => {
    console.log("use effect");
  }, []);

  /*
  useEffect(() => {
    console.log("use effect editBookingSlotKey");
  }, [editBookingSlotKey, editMode]);
*/

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
        setErrorMessage(error);
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

  function onFree(bookingSlotKey: string) {
    console.log("on Free:" + bookingSlotKey);
    setEditBookingSlotKey(bookingSlotKey);
    setEditMode(editModes.NEWBOOKING);
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

          {ready && editMode === editModes.TABLE && (
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
                  onFree={onFree}
                ></BookingTable>
              </div>
            </div>
          )}

          {ready && editMode === editModes.NEWBOOKING && (
            <div>
              <BookingSlotForm
                bookingSlotKey={editBookingSlotKey}
                onDone={() => setEditMode(editModes.TABLE)}
                formMode={formModes.NEW}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Booking;
