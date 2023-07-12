"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";

export const GlobalOptions = createContext();

let CACHE_LANGUAGES = {};
export const GlobalOptionsProvider = ({ children }) => {
  const { getData } = useFetch();
  const [refresh, setRefresh] = useState(false);
  const [openLanguageForm, setOpenLanguageForm] = useState(false);

  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getData("language");
      setLanguages(response?.data);
      for (const item of response) {
        CACHE_LANGUAGES[item?.id] = item?.name;
      }
    })();
  }, []);

  const values = {
    languages,
    CACHE_LANGUAGES,
    setRefresh,
    openLanguageForm,
    setOpenLanguageForm,
  };
  return (
    <GlobalOptions.Provider value={values}>{children}</GlobalOptions.Provider>
  );
};

export const useGlobalOptions = () => {
  return useContext(GlobalOptions);
};
