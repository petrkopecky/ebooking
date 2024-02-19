import { BookingTableStructure, BookingSlot } from "../types/bookingTable.ts";

export function getBookingTableStructure1(): Promise<BookingTableStructure> {
  //console.log("geBookingTableStructure");
  return fetch("/api/booking-table-structure", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<BookingTableStructure>;
  });
}

export function getBookingDateSlots(bookingDate: Date): Promise<BookingSlot[]> {
  console.log("getBookingDateSlots" + bookingDate.toDateString());
  return fetch("/api/booking-date-slots1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingDate),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("getBookingDateSlots:" + response.statusText);
    }
    return response.json() as Promise<BookingSlot[]>;
  });
}

async function getBookingDateSlotsA(bookingDate: Date) {
  const data: BookingSlot[] = await getBookingDateSlots(bookingDate);
  return data;
}

const BookingService = {
  getBookingTableStructure1,
  getBookingDateSlots,
};
export default BookingService;
