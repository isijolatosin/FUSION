import React, { createContext, useReducer, useContext } from "react";

import { theme } from "../infrastructure/theme";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    userName: null,
    userPhone: null,
    theme: theme,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_USER_NAME":
        return { ...state, userName: action.payload };
      case "SET_USER_PHONE":
        return { ...state, userPhone: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
