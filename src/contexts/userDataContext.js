import { createContext, useReducer } from "react";
import { userReducer } from "../reducers/userReducer";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, userDispatch] = useReducer(userReducer, {
    liked: [],
    history: [],
    playlists: [],
  });

  return (
    <UserDataContext.Provider value={{ userData, userDispatch }}>
      {children}
    </UserDataContext.Provider>
  );
};
