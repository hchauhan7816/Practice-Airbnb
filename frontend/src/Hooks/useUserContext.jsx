import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("useUserContext must be inside UserContextProvider");
  }

  return context;
};
