import { useEffect, useState } from "react";
import { BookingSlotDto } from "../../types/bookingSlotDto.ts";
import bookingService, {
  bookingSlotSave,
} from "../../service/BookingService.ts";
import { formModes } from "../../types/formMode.ts";
import { BookingUserDto } from "../../types/bookingUserDto.ts";
import { BookingSlotSaveDto } from "../../types/bookingSlotSaveDto.ts";

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
  const [input, setInput] = useState({
    bookingUser1: "",
  });

  const [bookingSlot, setBookingSlot] = useState<BookingSlotDto>();
  const [bookingUsers, setBookingUsers] = useState<BookingUserDto[]>();

  useEffect(() => {
    console.log("bookingSlotForm use effect");
    getBookingSlot();
    getBookingUsers();
    console.log("Booking users" + JSON.stringify(bookingUsers));
  }, []);

  const handleInputElement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("handle input:" + name + " " + value);
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextAreElement = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log("handle input:" + name + " " + value);
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectElement = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log("handle input:" + name + " " + value);
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function onSave() {
    const bookingSlotSaveDto: BookingSlotSaveDto = {};
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
      console.log("saveBookingSlot" + data.statusCode);
      if (data.statusCode === "OK") {
        const bookingSlotDto: BookingSlotDto = data.response as BookingSlotDto;
        console.log("saveBookingSlot");
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
        <select name="boookingUser1" onChange={handleSelectElement}>
          <option value=""></option>
          {bookingUsers?.map((bookingUser) => (
            <option key={bookingUser.id} value={bookingUser.id}>
              {bookingUser.secondName} {bookingUser.firstName}
            </option>
          ))}
        </select>
      </label>
      <textarea name="note" onChange={handleTextAreElement}></textarea>
      <button onClick={() => onDone()}> done</button>
      <button onClick={() => onSave()}> save</button>
    </div>
  );
}

export default BookingSlotForm;
