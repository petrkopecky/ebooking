import { useEffect, useState } from "react";
import { BookingSlotDto } from "../../types/bookingSlotDto.ts";
import bookingService from "../../service/BookingService.ts";
import { formModes } from "../../types/formMode.ts";
import { BookingUserDto } from "../../types/bookingUserDto.ts";

interface BookingSlotFormProps {
  bookingSlotKey: string;
  formMode: formModes;
  onDone(): void;
}

function BookingSlotForm({
  bookingSlotKey,
  formMode,
  onDone,
}: BookingSlotFormProps) {
  useEffect(() => {
    console.log("bookingSlotForm use effect");
    getBookingSlot();
    getBookingUsers();
    console.log("Booking users" + JSON.stringify(bookingUsers));
  }, []);

  const [bookingSlot, setBookingSlot] = useState<BookingSlotDto>();
  const [bookingUsers, setBookingUsers] = useState<BookingUserDto[]>();

  function getBookingUsers() {
    bookingService.bookingUsers().then((data) => {
      if (data.statusCode === "OK" && data.response) {
        setBookingUsers(data.response as BookingUserDto[]);
      } else {
        //show error
      }
    });
  }

  function getBookingSlot() {
    bookingService.getBookingSlot(bookingSlotKey).then((data) => {
      console.log(JSON.stringify(data));
      if (data.statusCode === "OK") {
        const bookingSlotDto: BookingSlotDto = data.response as BookingSlotDto;
        setBookingSlot(bookingSlotDto);
        if (formMode === formModes.NEW && bookingSlot) {
          //show error already booked
        } else {
          setBookingSlot(bookingSlotDto);
        }
      } else {
        //show error
      }
    });
  }

  function getBookingDate(): string | undefined {
    const bookingDate = bookingSlot?.bookingDate;
    return bookingDate;
  }

  function getBookedBy(): string | undefined {
    const userFirstSecondName =
      bookingSlot?.bookedByUserDto.firstName +
      " " +
      bookingSlot?.bookedByUserDto.secondName;
    return userFirstSecondName;
  }

  console.log("BookingSlotForm" + bookingSlotKey);
  return (
    <div>
      <p>booking slot form {bookingSlotKey}</p>
      <p>booking date: {getBookingDate()}</p>
      <p>booking booked by: {getBookedBy()}</p>

      <select className="dropdown">
        {bookingUsers?.map((bookingUser) => (
          <option key={bookingUser.id} value={bookingUser.id}>
            {bookingUser.secondName}
          </option>
        ))}
      </select>
      <button onClick={() => onDone()}> done</button>
    </div>
  );
}

export default BookingSlotForm;
