import { createContext, useContext, useState } from "react";
export const ApplicationContext = createContext<ApplicationContextType>({});
export type ApplicationContextType = {
  bookingDate?: Date;
  setBookingDate: (c: Date) => void;
};

export function useApplicationContext() {
  return useContext(ApplicationContext);
}

export function ApplicationContextProvider({ children }: any) {
  const [bookingDate, setBookingDate] = useState<Date>();
  const value: ApplicationContextType = { bookingDate, setBookingDate };
  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}
