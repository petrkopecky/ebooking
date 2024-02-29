import { createContext, useContext, useState } from "react";
import { BookingUser } from "./types/bookingUser";

export type UserContextType = {
  bookingUser?: BookingUser;
  userContextlogin: (c: BookingUser) => void;
  userContextlogout: () => void;
};
export const UserContext = createContext<UserContextType>({
  bookingUser: {},
  userContextlogin: () => {},
  userContextlogout: () => {},
});
export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }: any) => {
  const [bookingUser, setBookingUser] = useState<BookingUser>();
  const userContextlogin = (bookingUser: BookingUser) => {
    setBookingUser(bookingUser);
    localStorage.setItem("bookingUser", JSON.stringify(bookingUser));
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
  if (!bookingUser) {
    const bookingUserLocalStorage = localStorage.getItem("bookingUser");
    if (bookingUserLocalStorage) {
      setBookingUser(JSON.parse(bookingUserLocalStorage));
    }
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
