//import { BookingTableStructure, BookingSlot } from "../types/bookingTable.ts";
import * as bookingTableT from "../types/bookingTable.ts";

import { BookingUser } from "../types/bookingUser.ts";
import utilsService from "./UtilsService.ts";
import { ApiResponse } from "../types/apiResponse.ts";
import authorizationService from "./AuthorizationService.ts";
import { BookingSlotDto } from "../types/bookingSlotDto.ts";
export function getBookingTableStructure1(): Promise<bookingTableT.BookingTableStructure> {
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
    return response.json() as Promise<bookingTableT.BookingTableStructure>;
  });
}

export function getBookingDateSlots(
  bookingDate: Date
): Promise<bookingTableT.BookingSlot[]> {
  console.log("getBookingDateSlots" + bookingDate.toDateString());

  const authorizationToken: string | undefined =
    authorizationService.getAuthorizationToken();

  const headers: Headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (authorizationToken !== undefined) {
    headers.append("Authorization", authorizationToken);
  }

  return fetch("/api/booking-date-slots1", {
    method: "POST",
    headers: headers,
    body: utilsService.dateToYYYY_MM_DD(bookingDate),
  }).then((response) => {
    if (!response.ok) {
      return response.text().then(function (text) {
        throw text;
      });
    } else {
      return response.json() as Promise<bookingTableT.BookingSlot[]>;
    }
  });
}

export function getBookingSlot(
  bookingSlotKey: string
): Promise<BookingSlotDto> {
  console.log("getBookingDateSlot" + bookingSlotKey);

  const authorizationToken: string | undefined =
    authorizationService.getAuthorizationToken();

  const headers: Headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (authorizationToken !== undefined) {
    headers.append("Authorization", authorizationToken);
  }

  return fetch("/api/booking-slot", {
    method: "POST",
    headers: headers,
    body: bookingSlotKey,
  }).then((response) => {
    if (!response.ok) {
      return response.text().then(function (text) {
        throw text;
      });
    } else {
      return response.json() as Promise<BookingSlotDto>;
    }
  });
}

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

export function bookingUserByUserName(
  userName: string
): Promise<ApiResponse<BookingUser>> {
  return fetch("/api/booking-user-by-username", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: userName,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("bookingUserByUserName:" + response.statusText);
    } else {
      return response.json();
    }
  });
}

const BookingService = {
  getBookingTableStructure1,
  getBookingDateSlots,
  getBookingSlot,
  bookingUserLogin,
  bookingUserByUserName,
};
export default BookingService;
