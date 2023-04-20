import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext({});

export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, ready: true };
    case "LOGOUT":
      return { user: null, ready: true };
    case "LOGGEDOUT":
      return { user: null, ready: true };
    default:
      return state;
  }
};

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    ready: false,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    } else {
      dispatch({ type: "LOGGEDOUT", payload: user });
    }
  }, []);

  console.log("userContext state: ", state);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
