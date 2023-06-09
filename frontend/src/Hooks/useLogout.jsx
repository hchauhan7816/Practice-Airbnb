import { useUserContext } from "./useUserContext";

export const useLogout = () => {
  const { dispatch } = useUserContext();

  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
