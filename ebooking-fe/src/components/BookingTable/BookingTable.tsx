import { BookingTableStructure } from "../../types/bookingTableStructure.ts";

interface BookingTableProps {
  bookingTableStructure: BookingTableStructure;
  //bookingTableStructurex: string;
}

function BookingTable({ bookingTableStructure }: BookingTableProps) {
  return (
    <div>
      booking table
      <table></table>
    </div>
  );
}

export default BookingTable;
