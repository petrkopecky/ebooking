import { createContext, useContext, useState } from "react";
import { BookingUser } from "./types/bookingUser";
import authorizationService from "./service/AuthorizationService";
import bookingService from "./service/BookingService";

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
  };
  const userContextlogout = () => {
    setBookingUser(undefined);
  };
  const value = {
    bookingUser,
    userContextlogin,
    userContextlogout,
  };

  if (!bookingUser) {
    console.log("user context !bookingUser");
    const bookingUserName =
      authorizationService.getUserNameFromAthorizationToken();

    if (bookingUserName) {
      bookingService.bookingUserByUserName(bookingUserName).then((data) => {
        setBookingUser(data.response as BookingUser);
      });
    }
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
