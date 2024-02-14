import { BookingTableStructure, BookingSlot } from "../types/bookingTable.ts";
export async function getBookingTableStructure() {
  //https://stackoverflow.com/questions/48562406/trouble-with-fetch-in-react-with-cors
  //https://github.com/CalebCurry/react/blob/main/src/hooks/UseFetch.js
  //console.log("geBookingTableStructure");
  let response = await fetch("/api/booking-table-structure", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  //console.log("geBookingTableStructur status:" + response.status);
  if (response.status === 401) {
  }
  response.text().then(function (text) {
    //console.log("TEXT:" + text);
  });
  return response.body;
}

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
    //console.log("getBookingTableStructure status:" + response.status);
    return response.json() as Promise<BookingTableStructure>;
  });
}

export function getBookingDateSlots(): Promise<BookingSlot[]> {
  //console.log("getBookingDateSlots");
  return fetch("/api/booking-date-slots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    //console.log("getBookingDateSlots status:" + response.status);
    return response.json() as Promise<BookingSlot[]>;
  });
}

const BookingService = {
  getBookingTableStructure,
  getBookingTableStructure1,
  getBookingDateSlots,
};
export default BookingService;
