"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";

export const GlobalOptions = createContext();

export const GlobalOptionsProvider = ({ children }) => {
  const { getData } = useFetch();
  const [openLanguageForm, setOpenLanguageForm] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [CACHE_LANGUAGES, setCACHE_LANGUAGES] = useState({});
  const [regions, setRegions] = useState([]);
  const [CACHE_REGIONS, setCACHE_REGIONS] = useState({});
  const [defaultLanguage, setDefaultLanguage] = useState();
  const [defaultRegion, setDefaultRegion] = useState();

  const getAndCacheData = async (table, setData, setCache) => {
    const response = await getData(table);
    console.log(response, "----");
    setData(response);
    // if(table === 'language') setLanguages(response)
    let cache = {};
    if (response?.length) {
      for (const item of response) {
        cache[item?.id] = item?.name;
      }
      setCache(cache);
    }
  };
  const setDefaultSettings = (type, data) => {
    console.log(type, data);
    if (type === "region") {
      setDefaultRegion(data);
    } else {
      setDefaultLanguage(data);
    }
  };

  useEffect(() => {
    getAndCacheData("language", setLanguages, setCACHE_LANGUAGES).then(
      (res) => {
        setDefaultSettings("language", languages[0]);
      }
    );
    getAndCacheData("region", setRegions, setCACHE_REGIONS).then((res) => {
      setDefaultSettings("region", regions[0]);
    });
  }, []);
  console.log(defaultLanguage, defaultRegion);

  const values = {
    languages,
    CACHE_LANGUAGES,
    defaultLanguage,
    regions,
    CACHE_REGIONS,
    openLanguageForm,
    defaultRegion,
    setDefaultSettings,
    setOpenLanguageForm,
  };
  return (
    <GlobalOptions.Provider value={values}>{children}</GlobalOptions.Provider>
  );
};

export const useGlobalOptions = () => {
  return useContext(GlobalOptions);
};
