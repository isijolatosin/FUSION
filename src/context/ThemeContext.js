import React, { createContext, useReducer, useContext } from "react";

import { theme } from "../infrastructure/theme";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    user: {},
    gender: null,
    dob: null,
    height: null,
    religiousBelief: null,
    country: null,
    preference: null,
    whatThreeWordsDescribeYou: null, // array
    companyName: null,
    jobTitle: null,
    interests: null, // array
    lifestyleHabit: null, // array
    photos: null, // array
    theme: theme,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_USER":
        return { ...state, user: action.payload };
      case "SET_USER_GENDER":
        return { ...state, gender: action.payload };
      case "SET_USER_DOB":
        return { ...state, dob: action.payload };
      case "SET_USER_HEIGHT":
        return { ...state, height: action.payload };
      case "SET_USER_RELIGIOUSBELIEF":
        return { ...state, religiousBelief: action.payload };
      case "SET_USER_COUNTRY":
        return { ...state, country: action.payload };
      case "SET_USER_PREFERENCE":
        return { ...state, preference: action.payload };
      case "SET_USER_WHATTHREEWORDSDESCRIBESYOU":
        return { ...state, whatThreeWordsDescribeYou: action.payload };
      case "SET_USER_COMPANYNAME":
        return { ...state, companyName: action.payload };
      case "SET_USER_JOBTITLE":
        return { ...state, jobTitle: action.payload };
      case "SET_USER_INTERESTS":
        return { ...state, interests: action.payload };
      case "SET_USER_LIFESTYLEHABIT":
        return { ...state, lifestyleHabit: action.payload };
      case "SET_USER_PHOTOS":
        return { ...state, photos: action.payload };
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
