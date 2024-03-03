import { BookingTableStructure, BookingSlot } from "../types/bookingTable.ts";
import { BookingUser } from "../types/bookingUser.ts";
import utilsService from "./UtilsService.ts";
import { ApiResponse } from "../types/apiResponse.ts";
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

export async function bookingUserLogin(
  userName: string,
  userPassword: string
): Promise<BookingUser> {
  //console.log("bookingUserLogin" + userName);
  const data = await fetch("/api/booking-user-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: userName, userPassword: userPassword }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("bookingUserLogin:" + response.statusText);
    } else {
      /* response.json().then((data: ApiResponse<BookingUser>) => {
        console.log("DATA:" + data.statusCode);
        //return new Promise<BookingUser>
        */
      response.json().then((data: ApiResponse<BookingUser>) => {
        console.log("DATA:" + data.statusCode);
        return new Promise<BookingUser>((resolve, reject) => {
          console.log("new promise:" + JSON.stringify(data));
          console.log("new promise:" + data.response.userName);
          resolve(data.response);
        });
      });

      //const apiResponse:ApiResponse<BookingUser>=response.json() as ApiResponse<BookingUser>;
    }

    //return response.json() as Promise<BookingUser>;
  });
  return new Promise<BookingUser>((resolve, reject) => {
    console.log("new promise:" + JSON.stringify(data));
    console.log("new promise:" + data.response.userName);
    resolve(data.response);
  });
}

const BookingService = {
  getBookingTableStructure1,
  getBookingDateSlots,
  bookingUserLogin,
};
export default BookingService;
