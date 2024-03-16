import { useEffect, useState } from "react";
import { BookingSlotDto } from "../../types/bookingSlotDto.ts";
import bookingService from "../../service/BookingService.ts";
import { formModes } from "../../types/formMode.ts";

interface BookingSlotFormProps {
  bookingSlotKey: string;
  formMode: formModes;
  onDone(): void;
}

function BookingSlotForm({ bookingSlotKey, onDone }: BookingSlotFormProps) {
  useEffect(() => {
    console.log("bookingSlotForm use effect");
    getBookingSlot();
  }, []);
  const [bookingSlot, setBookingSlot] = useState<BookingSlotDto>();
  function getBookingSlot() {
    bookingService.getBookingSlot(bookingSlotKey).then((data) => {
      console.log(JSON.stringify(data));
      setBookingSlot(data);
    });
  }

  console.log("BookingSlotForm" + bookingSlotKey);
  return (
    <div>
      <p>booking slot form {bookingSlotKey}</p>
      <button onClick={() => onDone()}> done</button>
    </div>
  );
}

export default BookingSlotForm;
