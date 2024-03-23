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
import { BookingSlotTypes } from "../../types/bookingSlotTypes.ts";
import { useUserContext } from "../../UserContext";
import { useApplicationContext } from "../../ApplicationContext.tsx";

enum editModes {
  "TABLE",
  "FORMNEWBOOOKING",
  "FORMVIEWBOOKING",
}

function Booking() {
  const userContext = useUserContext();
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
  const [refreshState, setRefreshState] = useState<number>(0);

  const applicationContext = useApplicationContext();

  useEffect(() => {
    if (applicationContext.bookingDate) {
      setBookingDate(applicationContext.bookingDate);
    }
  }, []);

  useEffect(() => {
    setDate(bookingDate);
  }, [bookingDate, refreshState]);
  function setDate(date: Date) {
    applicationContext.setBookingDate(date);
    setError(false);
    setReady(false);
    setSpin(true);
    Promise.all([
      bookingService.getBookingTableStructure1().then((data) => {
        setBookingTableStructure(data);
      }),
      bookingService.getBookingDateSlots(bookingDate).then((data) => {
        setBookingSlots(data);
      }),
    ])
      .catch((error) => {
        setError(true);
        setErrorMessage(error);
      })
      .finally(() => {
        setSpin(false);
        setReady(!error);
      });
  }
  function refresh() {
    setRefreshState(refreshState + 1);
  }

  function onDateChange(date: Date) {
    setBookingDate(date);
  }

  function onBookingSlotClick(
    bookingSlotKey: string,
    bookingSlotValue: string
  ) {
    console.log("on onBookingSlotClick:" + bookingSlotKey);
    setEditBookingSlotKey(bookingSlotKey);
    if (userContext.bookingUser) {
      //dodelat kontrolu, zda jiz neni slot vytvoren, ci zmenen

      switch (bookingSlotValue) {
        case BookingSlotTypes.FREE:
          setEditMode(editModes.FORMNEWBOOOKING);
          break;
        case BookingSlotTypes.BOOKEDBYUSER:
          setEditMode(editModes.FORMVIEWBOOKING);
          break;
      }
    } else {
      //alert("You have to be logged in.");
    }
  }

  function onDoneBookingFormSlot() {
    refresh();
    setEditMode(editModes.TABLE);
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
                  onBookingSlotClick={onBookingSlotClick}
                ></BookingTable>
              </div>
            </div>
          )}

          {ready && editMode === editModes.FORMNEWBOOOKING && (
            <div>
              <BookingSlotForm
                bookingSlotKey={editBookingSlotKey}
                onDone={() => onDoneBookingFormSlot()}
                formMode={formModes.NEW}
              />
            </div>
          )}
          {ready && editMode === editModes.FORMVIEWBOOKING && (
            <div>
              <BookingSlotForm
                bookingSlotKey={editBookingSlotKey}
                onDone={() => onDoneBookingFormSlot()}
                formMode={formModes.VIEW}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Booking;
