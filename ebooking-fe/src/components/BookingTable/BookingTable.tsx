import * as bookingTableT from "../../types/bookingTable.ts";
import "./BookingTable.css";
import utilsService from "../../service/UtilsService.ts";

interface BookingTableProps {
  bookingDate?: Date;
  bookingTableStructure?: bookingTableT.BookingTableStructure;
  bookingSlots?: bookingTableT.BookingSlot[];
  onFree?(): void;
}

function BookingTable({
  bookingDate,
  bookingTableStructure,
  bookingSlots,
  onFree,
}: BookingTableProps) {
  function onFreeClick(): void {
    onFree && onFree();
  }

  function hoursSlotsRow(
    bookingTableStructure: bookingTableT.BookingTableStructure
  ): JSX.Element[] {
    const columns: JSX.Element[] = [];
    columns.push(
      <th className="header-hour-slot" key="-">
        -
      </th>
    );

    bookingTableStructure.hourSlots.forEach((hourSlot) => {
      columns.push(
        <th
          className="header-hour-slot"
          colSpan={hourSlot.slotsPerHour.length}
          key={hourSlot.key}
        >
          {hourSlot.name}
        </th>
      );
    });
    return columns;
  }

  function timeSlotsRow(
    bookingTableStructure: bookingTableT.BookingTableStructure
  ): JSX.Element[] {
    const columns: JSX.Element[] = [];
    columns.push(
      <th className="header-time-slot" key="-">
        -
      </th>
    );

    bookingTableStructure.hourSlots.forEach((hourSlot) => {
      hourSlot.slotsPerHour.forEach((slotPerHour) => {
        let timeSlotKey = hourSlot.key + slotPerHour.key;
        columns.push(
          <th key={timeSlotKey} className="header-time-slot">
            {slotPerHour.name}
          </th>
        );
      });
    });
    return columns;
  }

  function bookingArticlesRows(
    bookingDate: Date,
    bookingTableStructure: bookingTableT.BookingTableStructure,
    bookingSlots: bookingTableT.BookingSlot[]
  ): JSX.Element[] {
    const columns: JSX.Element[] = [];

    bookingTableStructure.articles.forEach((article) => {
      columns.push(
        bookingArticleRow(
          bookingDate,
          bookingTableStructure,
          bookingSlots,
          article
        )
      );
    });
    return columns;
  }

  function getBookingDateSlot(
    slotKey: string,
    bookingSlots: bookingTableT.BookingSlot[]
  ): bookingTableT.BookingSlot {
    let bookingSlot = bookingSlots.find((slot) => slot.slotKey === slotKey);
    if (bookingSlot === undefined) {
      bookingSlot = {} as bookingTableT.BookingSlot;
      bookingSlot.slotKey = slotKey;
      bookingSlot.slotValue = "CLOSED";
      bookingSlot.info = "closed";
      bookingSlot.userPins = [];
    }
    return bookingSlot;
  }

  function getBookingSlotTd(
    slotKey: string,
    bookingSlots: bookingTableT.BookingSlot[]
  ): JSX.Element {
    //const bookingSlotsE: JSX.Element;
    let bookingSlot: bookingTableT.BookingSlot = getBookingDateSlot(
      slotKey,
      bookingSlots
    );

    return <div>{bookingSlot.slotValue}</div>;
  }
  function getBookingSlotClassName(
    slotKey: string,
    bookingSlots: bookingTableT.BookingSlot[]
  ): string {
    let className: string = "closed-slot";
    let bookingSlot: bookingTableT.BookingSlot = getBookingDateSlot(
      slotKey,
      bookingSlots
    );
    if (bookingSlot.slotValue === "CLOSED") {
      className = "closed-slot";
    } else if (bookingSlot.slotValue === "FREE") {
      className = "free-slot";
    } else if (bookingSlot.slotValue === "BOOKED") {
      className = "booked-slot";
    } else if (bookingSlot.slotValue === "BOOKED-BY-USER") {
      className = "booked-by-user-slot";
    } else if (bookingSlot.slotValue === "BOOKED-FOR-USER") {
      className = "booked-for-user-slot";
    }

    return className;
  }

  function bookingArticleRow(
    bookingDate: Date,
    bookingTableStructure: bookingTableT.BookingTableStructure,
    bookingSlots: bookingTableT.BookingSlot[],
    article: bookingTableT.Article
  ): JSX.Element {
    const bookingSlotsE: JSX.Element[] = [];
    bookingSlotsE.push(<td key={article.key}>{article.name}</td>);
    bookingTableStructure.hourSlots.forEach((hourSlot) => {
      hourSlot.slotsPerHour.forEach((slotPerHour) => {
        let slotKey: string =
          article.key +
          "-" +
          utilsService.dateToYYYY_MM_DD(bookingDate) +
          "-" +
          slotPerHour.key;
        bookingSlotsE.push(
          <td
            id={slotKey}
            key={slotKey}
            className={getBookingSlotClassName(slotKey, bookingSlots)}
            onClick={() => onFreeClick()}
          >
            {slotKey}
            {getBookingSlotTd(slotKey, bookingSlots)}
          </td>
        );
      });
    });
    const row = <tr key={article.key}>{bookingSlotsE}</tr>;
    return row;
  }

  return (
    <div>
      booking table:{bookingDate?.toDateString()}
      {bookingDate && bookingTableStructure && bookingSlots && (
        <table>
          <thead>
            <tr key="hourslots">{hoursSlotsRow(bookingTableStructure)}</tr>
            <tr key="timeslots">{timeSlotsRow(bookingTableStructure)}</tr>
          </thead>
          <tbody>
            {bookingArticlesRows(
              bookingDate,
              bookingTableStructure,
              bookingSlots
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingTable;
