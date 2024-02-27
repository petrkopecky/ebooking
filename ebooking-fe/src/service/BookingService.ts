import { BookingTableStructure, BookingSlot } from "../types/bookingTable.ts";
import { BookingUserType } from "../types/bookingUser.ts";
import utilsService from "./UtilsService.ts";
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
    body: utilsService.dateToYYYY_MM_DD(bookingDate),
  }).then((response) => {
    if (!response.ok) {
      console.log(response.statusText);
      throw new Error("getBookingDateSlots:" + response.statusText);
    }
    return response.json() as Promise<BookingSlot[]>;
  });
}

export function bookingUserLogin(
  userName: string,
  userPassword: string
): Promise<BookingUserType> {
  console.log("bookingUserLogin" + userName);
  return fetch("/api/booking-user-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: userName, userPassword: userPassword }),
  }).then((response) => {
    if (!response.ok) {
      console.log(response.statusText);
      throw new Error("bookingUserLogin:" + response.statusText);
    }
    return response.json() as Promise<BookingUserType>;
  });
}

const BookingService = {
  getBookingTableStructure1,
  getBookingDateSlots,
  bookingUserLogin,
};
export default BookingService;
