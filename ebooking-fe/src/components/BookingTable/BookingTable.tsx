import * as bookingTableT from "../../types/bookingTable.ts";
import "./BookingTable.css";

interface BookingTableProps {
  bookingTableStructure: bookingTableT.BookingTableStructure;
  bookingSlots: bookingTableT.BookingSlot[];
}

function BookingTable({
  bookingTableStructure,
  bookingSlots,
}: BookingTableProps) {
  console.log("BookingTable");
  return (
    <div>
      booking table
      <table>
        <thead>
          <tr key="hourslots">{hoursSlotsRow(bookingTableStructure)}</tr>
          <tr key="timeslots">{timeSlotsRow(bookingTableStructure)}</tr>
        </thead>
        <tbody>
          {bookingArticlesRows(bookingTableStructure, bookingSlots)}
        </tbody>
      </table>
    </div>
  );
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
  bookingTableStructure: bookingTableT.BookingTableStructure,
  bookingSlots: bookingTableT.BookingSlot[]
): JSX.Element[] {
  const columns: JSX.Element[] = [];

  bookingTableStructure.articles.forEach((article) => {
    columns.push(
      bookingArticleRow(bookingTableStructure, bookingSlots, article)
    );
  });
  return columns;
}

function bookingArticleRow(
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
        bookingTableStructure.dateKey +
        hourSlot.key +
        slotPerHour.key;
      bookingSlotsE.push(
        <td id={slotKey} key={slotKey}>
          {slotKey}
        </td>
      );
    });
  });
  const row = <tr key={article.key}>{bookingSlotsE}</tr>;
  return row;
}

export default BookingTable;
