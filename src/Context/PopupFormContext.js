import React, { createContext } from "react";
import { useState } from "react";

export const PopupFormContext = createContext();
export const PopupFormProvider = ({ children }) => {
  // const [] = useState();
  const [openForm, setOpenForm] = useState({});
  
  const dispatchForm = (form) => {
    if (form) {
      setOpenForm(form);
    } else {
      setOpenForm({});
    }
  };

  return (
    <PopupFormContext.Provider value={{ dispatchForm, openForm }}>
      {children}
    </PopupFormContext.Provider>
  );
};
