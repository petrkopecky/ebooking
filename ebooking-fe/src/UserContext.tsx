import { createContext, useContext, useState } from "react";
import { BookingUser } from "./types/bookingUser";

export type UserContextType = {
  /* userName: string;
  userRole: string;
  setUserName: (c: string) => void;
  setUserRole: (c: string) => void;
  */
  bookingUser?: BookingUser;
  //setBookingUser: (c: BookingUser) => void;
  userContextlogin: (c: BookingUser) => void;
  userContextlogout: () => void;
};
export const UserContext = createContext<UserContextType>({
  /*userName: "",
  userRole: "",
  setUserName: () => {},
  setUserRole: () => {},
  */
  bookingUser: {},
  userContextlogin: () => {},
  userContextlogout: () => {},
});
export const useUserContext = () => {
  return useContext(UserContext);
};

/*
export const xxuserContextlogin = (bookingUser: BookingUser) => {
  const userContext = useUserContext();
  userContext.setBookingUser(bookingUser);
};
*/

export const UserContextProvider = ({ children }: any) => {
  const [bookingUser, setBookingUser] = useState<BookingUser>({});
  const userContextlogin = (bookingUser: BookingUser) => {
    setBookingUser(bookingUser);
    localStorage.setItem("bookingUser", JSON.stringify({ bookingUser }));
  };
  const userContextlogout = () => {
    setBookingUser({});
    localStorage.removeItem("bookingUser");
  };
  const value = {
    bookingUser,
    userContextlogin,
    userContextlogout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
