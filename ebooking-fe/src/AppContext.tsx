import { createContext, useContext } from "react";
export type AppContextType = {
  user?: string;
  info?: string;
};
export const AppContext = createContext<AppContextType>({
  user: "aa", // set a default value
  info: "info",
});

export const useAppContext = () => useContext(AppContext);
