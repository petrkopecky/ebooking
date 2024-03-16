import { BookingTableStructure, BookingSlot } from "../types/bookingTable.ts";
import { BookingUser } from "../types/bookingUser.ts";
import utilsService from "./UtilsService.ts";
import { ApiResponse } from "../types/apiResponse.ts";
import authorizationService from "./AuthorizationService.ts";
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
      return response.json() as Promise<BookingSlot[]>;
    }
  });
}

export function getBookingDateSlot(
  bookingSlotKey: string
): Promise<BookingSlot> {
  console.log("getBookingDateSlot" + bookingSlotKey);

  const authorizationToken: string | undefined =
    authorizationService.getAuthorizationToken();

  const headers: Headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (authorizationToken !== undefined) {
    headers.append("Authorization", authorizationToken);
  }

  return fetch("/api/booking-date-slot", {
    method: "POST",
    headers: headers,
    body: bookingSlotKey,
  }).then((response) => {
    if (!response.ok) {
      return response.text().then(function (text) {
        throw text;
      });
    } else {
      return response.json() as Promise<BookingSlot>;
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
  bookingUserLogin,
  bookingUserByUserName,
};
export default BookingService;
