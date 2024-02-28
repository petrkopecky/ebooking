import { createContext, useContext } from "react";
import { BookingUser } from "./types/bookingUser";

export type UserContextType = {
  /* userName: string;
  userRole: string;
  setUserName: (c: string) => void;
  setUserRole: (c: string) => void;
  */
  bookingUser?: BookingUser;
  setBookingUser: (c: BookingUser) => void;
};
export const UserContext = createContext<UserContextType>({
  /*userName: "",
  userRole: "",
  setUserName: () => {},
  setUserRole: () => {},
  */
  bookingUser: {},
  setBookingUser: () => {},
});

export const useUserContext = () => useContext(UserContext);
