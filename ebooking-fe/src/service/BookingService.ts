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
  let authorization: string | undefined;
  authorization = "u";

  const headers: Headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (authorization !== undefined) {
    headers.append("Authorization", authorization);
  }

  return fetch("/api/booking-date-slots1", {
    method: "POST",
    headers: headers,
    body: utilsService.dateToYYYY_MM_DD(bookingDate),
  }).then((response) => {
    if (!response.ok) {
      console.log(response.statusText);
      throw new Error("getBookingDateSlots:" + response.statusText);
    }
    return response.json() as Promise<BookingSlot[]>;
  });
}

/*
async function XbookingUserLogin(
  userName: string,
  userPassword: string
): Promise<BookingUser> {
  const data: ApiResponse<BookingUser> | void = await fetch(
    "/api/booking-user-login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: userName, userPassword: userPassword }),
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error("bookingUserLogin:" + response.statusText);
    } else {
      return response.json();
      //const apiResponse:ApiResponse<BookingUser>=response.json() as ApiResponse<BookingUser>;
    }
  });
  console.log("fetch:" + JSON.stringify(data));
  if (data?.statusCode === "OK") {
    return new Promise<BookingUser>((resolve, reject) => {
      resolve(data?.response as BookingUser);
    });
  } else {
    throw new Error("bookingUserLogin:" + data?.statusCode);
  }
}
*/

export function bookingUserLogin(
  userName: string,
  userPassword: string
): Promise<ApiResponse<BookingUser>> {
  return fetch("/api/booking-user-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: userName, userPassword: userPassword }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("bookingUserLogin:" + response.statusText);
    } else {
      return response.json();
    }
  });
}

const BookingService = {
  getBookingTableStructure1,
  getBookingDateSlots,
  bookingUserLogin,
};
export default BookingService;
