import { useEffect, useState } from "react";
import { BookingSlotDto } from "../../types/bookingSlotDto.ts";
import bookingService, {
  bookingSlotSave,
} from "../../service/BookingService.ts";
import { formModes } from "../../types/formMode.ts";
import { BookingUserDto } from "../../types/bookingUserDto.ts";
import { BookingSlotSaveDto } from "../../types/bookingSlotSaveDto.ts";
import {
  UserContext,
  UserContextType,
  useUserContext,
} from "../../UserContext";

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
  const userContext = useUserContext();
  const [bookingUser1, setBookingUser1] = useState<number>();
  const [bookingNote, setBookingNote] = useState<string>();

  const [bookingSlot, setBookingSlot] = useState<BookingSlotDto>();
  const [bookingUsers, setBookingUsers] = useState<BookingUserDto[]>();

  useEffect(() => {
    console.log("bookingSlotForm use effect");
    getBookingSlot();
    getBookingUsers();
    console.log("Booking users" + JSON.stringify(bookingUsers));
  }, []);

  const handleBookingNoteElement = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookingNote(value);
  };

  const handleBookingUser1Element = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookingUser1(parseInt(value));
  };

  function onSave() {
    if (userContext.bookingUser === undefined) {
      throw "not logged in";
    }
    const bookingSlotSaveDto: BookingSlotSaveDto = {};
    bookingSlotSaveDto.bookingSlotKey = bookingSlotKey;
    if (bookingUser1) {
      if (bookingSlotSaveDto.bookingUsersIds === undefined) {
        bookingSlotSaveDto.bookingUsersIds = [] as Array<number>;
      }
      bookingSlotSaveDto.bookingUsersIds.push(bookingUser1);
      bookingSlotSaveDto.bookedByBookingUserId = userContext.bookingUser.id;
    }
    saveBookingSlot(bookingSlotSaveDto);
  }

  function getBookingUsers() {
    bookingService.bookingUsers().then((data) => {
      if (data.statusCode === "OK" && data.response) {
        setBookingUsers(data.response as BookingUserDto[]);
      } else {
        //show error
      }
    });
  }

  function saveBookingSlot(bookingSlotSaveDto: BookingSlotSaveDto) {
    bookingService.bookingSlotSave(bookingSlotSaveDto).then((data) => {
      console.log("saveBookingSlot " + data.statusCode);
      if (data.statusCode === "OK") {
        const bookingSlotDto: BookingSlotDto = data.response as BookingSlotDto;
        setBookingSlot(bookingSlotDto);
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
      <label>
        Pick a user(s):
        <select name="boookingUser1" onChange={handleBookingUser1Element}>
          <option value=""></option>
          {bookingUsers?.map((bookingUser) => (
            <option key={bookingUser.id} value={bookingUser.id}>
              {bookingUser.secondName} {bookingUser.firstName}
            </option>
          ))}
        </select>
      </label>
      <textarea name="note" onChange={handleBookingNoteElement}></textarea>
      <button onClick={() => onDone()}> done</button>
      <button onClick={() => onSave()}> save</button>
    </div>
  );
}

export default BookingSlotForm;
