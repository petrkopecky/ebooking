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
  const [bookingUser1Id, setBookingUser1Id] = useState<number>();
  const [bookingNote, setBookingNote] = useState<string>();

  const [bookingSlot, setBookingSlot] = useState<BookingSlotDto>();
  const [bookingUsers, setBookingUsers] = useState<BookingUserDto[]>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    initLoad();
  }, []);

  useEffect(() => {
    if (loaded) {
      console.log("input controls s");
      setInputControls();
      setReady(true);
    }
  }, [loaded]);

  async function initLoad() {
    console.log("init load start");
    await Promise.all([getBookingUsers(), getBookingSlot()]).then(() => {
      setLoaded(true);
    });

    console.log("init load done done");
  }

  async function getBookingUsers() {
    await bookingService.bookingUsers().then((data) => {
      if (data.statusCode === "OK" && data.response) {
        setBookingUsers(data.response as BookingUserDto[]);
        console.log("getBookingUsers done");
      } else {
        //throw error
      }
    });
  }

  async function getBookingSlot() {
    await bookingService.getBookingSlot(bookingSlotKey).then((data) => {
      if (data.statusCode === "OK") {
        const bookingSlotDto: BookingSlotDto = data.response as BookingSlotDto;
        if (formMode === formModes.NEW && bookingSlot) {
          //throw error
        } else {
          console.log("getBookingSlot done");
          setBookingSlot(bookingSlotDto);
        }
      } else {
        //throw error
      }
    });
  }
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
    setBookingUser1Id(parseInt(value));
  };

  function onSave() {
    if (userContext.bookingUser === undefined) {
      throw "not logged in";
    }
    const bookingSlotSaveDto: BookingSlotSaveDto = {};
    bookingSlotSaveDto.bookingSlotKey = bookingSlotKey;
    if (bookingUser1Id) {
      if (bookingSlotSaveDto.bookingUsersIds === undefined) {
        bookingSlotSaveDto.bookingUsersIds = [] as Array<number>;
      }
      bookingSlotSaveDto.bookingUsersIds.push(bookingUser1Id);
      bookingSlotSaveDto.bookedByBookingUserId = userContext.bookingUser.id;
    }
    saveBookingSlot(bookingSlotSaveDto);
  }

  function saveBookingSlot(bookingSlotSaveDto: BookingSlotSaveDto) {
    bookingService.bookingSlotSave(bookingSlotSaveDto).then((data) => {
      if (data.statusCode === "OK") {
        const bookingSlotDto: BookingSlotDto = data.response as BookingSlotDto;
        setBookingSlot(bookingSlotDto);
      } else {
        //show error
      }
    });
  }

  function setInputControls() {
    if (formMode == formModes.NEW) {
      setBookingUser1Id(userContext.bookingUser?.id);
    } else {
      setBookingUser1Id(bookingSlot?.bookingUsersDto[0].id);
    }
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

  return (
    <div>
      {!ready && <p>Loading</p>}
      {ready && (
        <div>
          <p>form mode {formMode}</p>
          <p>booking slot form {bookingSlotKey}</p>
          <p>booking date: {getBookingDate()}</p>
          <p>booking booked by: {getBookedBy()}</p>
          <label>
            Pick a user(s):
            <select
              name="boookingUser1"
              onChange={handleBookingUser1Element}
              value={bookingUser1Id}
            >
              <option value=""></option>
              {bookingUsers?.map((bookingUser) => (
                <option key={bookingUser.id} value={bookingUser.id}>
                  {bookingUser.secondName} {bookingUser.firstName}{" "}
                  {bookingUser.id}
                </option>
              ))}
            </select>
            <select name="boookingUser2" onChange={handleBookingUser1Element}>
              <option></option>
              {bookingUsers?.map((bookingUser) => (
                <option key={bookingUser.id} value={bookingUser.id}>
                  {bookingUser.secondName} {bookingUser.firstName}{" "}
                  {bookingUser.id}
                </option>
              ))}
            </select>
          </label>
          <textarea name="note" onChange={handleBookingNoteElement}></textarea>
          <button onClick={() => onDone()}> done</button>
          <button onClick={() => onSave()}> save</button>
        </div>
      )}
    </div>
  );
}

export default BookingSlotForm;
