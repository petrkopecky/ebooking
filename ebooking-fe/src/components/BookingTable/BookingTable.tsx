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
  bookingTableStructure.articles.forEach((article) => {
    console.log(article.name);
  });
  return (
    <div>
      booking table
      <table>
        <thead>
          <tr>{hoursSlotsRow(bookingTableStructure)}</tr>
          <tr>{timeSlotsRow(bookingTableStructure)}</tr>
        </thead>
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
        colSpan={bookingTableStructure.slotsPerHour.length}
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
    bookingTableStructure.slotsPerHour.forEach((slotPerHour) => {
      columns.push(<th className="header-time-slot">{slotPerHour.name}</th>);
    });
  });
  return columns;
}

export default BookingTable;
