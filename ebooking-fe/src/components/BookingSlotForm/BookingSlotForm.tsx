import { useEffect, useState } from "react";
import { BookingSlotDto } from "../../types/bookingSlotDto.ts";
import bookingService from "../../service/BookingService.ts";
import { formModes } from "../../types/formMode.ts";
import { BookingUserDto } from "../../types/bookingUserDto.ts";
import { BookingSlotSaveDto } from "../../types/bookingSlotSaveDto.ts";
import { useUserContext } from "../../UserContext";
import UtilsService from "../../service/UtilsService.ts";

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
  //const [bookingSlotId, setBookingSlotId] = useState<string>();
  const [bookingUser1Id, setBookingUser1Id] = useState<number>();
  const [bookingUser2Id, setBookingUser2Id] = useState<number>();
  const [bookingNote, setBookingNote] = useState<string>();

  const [bookingSlot, setBookingSlot] = useState<BookingSlotDto>();
  const [bookingUsers, setBookingUsers] = useState<BookingUserDto[]>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [mode, setMode] = useState<formModes>();

  useEffect(() => {
    console.log(JSON.stringify(userContext.bookingUser));
    setMode(formMode);
    initLoad();
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(userContext.bookingUser));
    setInputControls();
  }, [bookingSlot]);

  useEffect(() => {
    if (loaded) {
      setInputControls();
      setReady(true);
    }
  }, [loaded]);

  function initLoad() {
    Promise.all([getBookingUsersP(), getBookingSlotP()])
      .then(([bookingUserDtos, bookingSlotDto]) => {
        setBookingUsers(bookingUserDtos);
        setBookingSlot(bookingSlotDto);
        setLoaded(true);
      })
      .then(() => {});
  }

  function getBookingUsersP(): Promise<BookingUserDto[]> {
    return new Promise((resolve, reject) => {
      bookingService.bookingUsers().then((data) => {
        if (data.statusCode === "OK" && data.response) {
          resolve(data.response as BookingUserDto[]);
        } else {
          reject(data.statusMessage);
        }
      });
    });
  }

  function getBookingSlotP(): Promise<BookingSlotDto> {
    return new Promise((resolve, reject) => {
      bookingService.getBookingSlot(bookingSlotKey).then((data) => {
        if (data.statusCode === "OK") {
          const bookingSlotDto: BookingSlotDto =
            data.response as BookingSlotDto;
          if (mode === formModes.NEW && bookingSlot) {
            reject("New but slot already booked.");
          } else {
            resolve(bookingSlotDto);
          }
        } else {
          reject(data.statusMessage);
        }
      });
    });
  }
  function setInputControls() {
    console.log(JSON.stringify(bookingSlot));
    if (mode == formModes.NEW) {
      setBookingUser1Id(userContext.bookingUser?.id);
    } else {
      if (
        bookingSlot &&
        bookingSlot.bookingUsersDto &&
        bookingSlot.bookingUsersDto[0]
      ) {
        setBookingUser1Id(bookingSlot.bookingUsersDto[0].id);
      }

      if (
        bookingSlot &&
        bookingSlot.bookingUsersDto &&
        bookingSlot.bookingUsersDto[1]
      ) {
        setBookingUser2Id(bookingSlot.bookingUsersDto[1].id);
      }
      if (bookingSlot && bookingSlot.note) {
        setBookingNote(bookingSlot.note);
      }
    }
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

  const handleBookingUser2Element = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookingUser2Id(parseInt(value));
  };

  function onSave() {
    if (userContext.bookingUser === undefined) {
      throw "not logged in";
    }
    const bookingSlotSaveDto: BookingSlotSaveDto = {};
    bookingSlotSaveDto.bookingSlotId = bookingSlot?.id;
    bookingSlotSaveDto.bookingSlotKey = bookingSlotKey;
    if (bookingUser1Id) {
      if (bookingSlotSaveDto.bookingUsersIds === undefined) {
        bookingSlotSaveDto.bookingUsersIds = [] as Array<number>;
      }
      bookingSlotSaveDto.bookingUsersIds.push(bookingUser1Id);
    }
    if (bookingUser2Id) {
      if (bookingSlotSaveDto.bookingUsersIds === undefined) {
        bookingSlotSaveDto.bookingUsersIds = [] as Array<number>;
      }
      bookingSlotSaveDto.bookingUsersIds.push(bookingUser2Id);
    }
    bookingSlotSaveDto.bookedByBookingUserId = userContext.bookingUser.id;
    bookingSlotSaveDto.bookingSlotValue = "BOOKED";
    bookingSlotSaveDto.note = bookingNote;
    saveBookingSlot(bookingSlotSaveDto);
  }

  function saveBookingSlot(bookingSlotSaveDto: BookingSlotSaveDto) {
    console.log("save:" + JSON.stringify(bookingSlotSaveDto));
    bookingService.bookingSlotSave(bookingSlotSaveDto).then((data) => {
      if (data.statusCode === "OK") {
        const bookingSlotDto: BookingSlotDto = data.response as BookingSlotDto;
        console.log("save result:" + JSON.stringify(bookingSlotDto));
        setMode(formModes.VIEW);
        setBookingSlot(bookingSlotDto);
      } else {
        //show error
      }
    });
  }

  function getBookingDate(): string | undefined {
    if (mode === formModes.NEW) {
      return bookingSlot?.bookingDate;
    } else {
      return UtilsService.getDateFromBookingSlotKey(bookingSlotKey);
    }
  }

  function getBookedBy(): string | undefined {
    if (mode === formModes.NEW) {
      return (
        userContext.bookingUser?.firstName +
        " " +
        userContext.bookingUser?.secondName
      );
    } else {
      const userFirstSecondName =
        bookingSlot?.bookedByUserDto.firstName +
        " " +
        bookingSlot?.bookedByUserDto.secondName;
      return userFirstSecondName;
    }
  }

  return (
    <div>
      {!ready && <p>Loading</p>}
      {ready && (
        <div>
          <p>form mode {mode}</p>
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
            <select
              name="boookingUser2"
              onChange={handleBookingUser2Element}
              value={bookingUser2Id}
            >
              <option></option>
              {bookingUsers?.map((bookingUser) => (
                <option key={bookingUser.id} value={bookingUser.id}>
                  {bookingUser.secondName} {bookingUser.firstName}{" "}
                  {bookingUser.id}
                </option>
              ))}
            </select>
          </label>
          <textarea
            name="note"
            onChange={handleBookingNoteElement}
            value={bookingNote}
          ></textarea>
          <button onClick={() => onDone()}> done</button>
          <button onClick={() => onSave()}> save</button>
        </div>
      )}
    </div>
  );
}

export default BookingSlotForm;
