import { useEffect } from "react";
import { BookingSlot } from "../../types/bookingTable.ts";

interface BookingSlotFormProps {
  bookingSlotKey: string;
  onDone(): void;
}

function BookingSlotForm({ bookingSlotKey, onDone }: BookingSlotFormProps) {
  useEffect(() => console.log("bookingSlotForm use effect"), []);
  console.log("BookingSlotForm" + bookingSlotKey);
  return (
    <div>
      <p>booking slot form {bookingSlotKey}</p>
      <button onClick={() => onDone()}> done</button>
    </div>
  );
}

export default BookingSlotForm;
