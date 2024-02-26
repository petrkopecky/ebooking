import { createContext, useContext } from "react";
export type UserContextType = {
  userName: string;
  setUserName: (c: string) => void;
};
export const UserContext = createContext<UserContextType>({
  userName: "",
  setUserName: () => {},
});

export const useUserContext = () => useContext(UserContext);
