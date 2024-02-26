import { createContext, useContext } from "react";
import { BookingUserType } from "./types/bookingUser";
export type UserContextType = {
  /* userName: string;
  userRole: string;
  setUserName: (c: string) => void;
  setUserRole: (c: string) => void;
  */
  bookingUser?: BookingUserType;
  setBookingUser: (c: BookingUserType) => void;
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
