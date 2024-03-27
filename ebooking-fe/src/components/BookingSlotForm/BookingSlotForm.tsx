import { useEffect, useState } from "react";
import { BookingSlotDto } from "../../types/bookingSlotDto.ts";
import bookingService from "../../service/BookingService.ts";
import { formModes } from "../../types/formMode.ts";
import { BookingUserDto } from "../../types/bookingUserDto.ts";
import { BookingSlotSaveDto } from "../../types/bookingSlotSaveDto.ts";
import { useUserContext } from "../../UserContext";
import UtilsService from "../../service/UtilsService.ts";
import l, { getL } from "../../service/Localization.ts";

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
    if (loaded) {
      setInputControls();
      setReady(true);
    }
  }, [loaded]);

  function initLoad() {
    if (mode === formModes.NEW) {
      initLoadNew();
    } else {
      initLoadViewEdit();
    }
  }

  function initLoadViewEdit() {
    Promise.all([getBookingUsersP(), getBookingSlotP()])
      .then(([bookingUserDtos, bookingSlotDto]) => {
        setBookingUsers(bookingUserDtos);
        setBookingSlot(bookingSlotDto);
        setLoaded(true);
      })
      .then(() => {});
  }

  function initLoadNew() {
    Promise.all([getBookingUsersP()])
      .then(([bookingUserDtos]) => {
        setBookingUsers(bookingUserDtos);
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
    setReady(false);
    setLoaded(false);
    bookingService.bookingSlotSave(bookingSlotSaveDto).then((data) => {
      if (data.statusCode === "OK") {
        const bookingSlotDto: BookingSlotDto = data.response as BookingSlotDto;
        console.log("save result:" + JSON.stringify(bookingSlotDto));
        //setMode(formModes.VIEW);
        //setBookingSlot(bookingSlotDto);
        //setLoaded(true);
        onDone();
      } else {
        //show error
      }
    });
  }

  function onEdit() {
    setMode(formModes.EDIT);
  }

  function onCancel() {
    onDone();
  }

  function onClose() {
    onDone();
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
          <p>
            {l.booking_date}: {getBookingDate()}
          </p>
          <p>
            {l.booked_by}: {getBookedBy()}
          </p>
          {(mode === formModes.EDIT || mode === formModes.NEW) && (
            <div>
              <label>
                {l.select_user}:
                <select
                  name="boookingUser1"
                  onChange={handleBookingUser1Element}
                  value={bookingUser1Id}
                  disabled={true}
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
              <label>
                {l.note}
                <textarea
                  name="note"
                  onChange={handleBookingNoteElement}
                  value={bookingNote}
                ></textarea>
              </label>
              <button onClick={() => onCancel()}> {l.cancel}</button>
              <button onClick={() => onSave()}> {l.submit}</button>
            </div>
          )}
          {mode === formModes.VIEW && (
            <div>
              <p>
                {" "}
                booked by:
                {bookingSlot?.bookedByUserDto.firstName +
                  " " +
                  bookingSlot?.bookedByUserDto.secondName}
              </p>

              {bookingSlot?.bookingUsersDto?.map((bookingUser) => (
                <p>
                  {" "}
                  user:{bookingUser.firstName + " " + bookingUser.secondName}
                </p>
              ))}
              <p>note:{bookingSlot?.note} </p>
              <button onClick={() => onEdit()}> edit</button>
              <button onClick={() => onClose()}> close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BookingSlotForm;
