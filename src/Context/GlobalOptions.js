"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getUser } from "../Api/auth";
import { getAdmin } from "../Api/globalActions";
import Cookies from "js-cookie";

export const GlobalOptions = createContext();

export const GlobalOptionsProvider = ({ children }) => {
  const [regionId, setRegionId] = useLocalStorage("KADINLE_DEFAULT_REGION", 0);
  const [languageId, setLanguageId] = useLocalStorage(
    "KADINLE_DEFAULT_LANGUAGE",
    ""
  );
  const { getData } = useFetch();
  const [openLanguageForm, setOpenLanguageForm] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [CACHE_LANGUAGES, setCACHE_LANGUAGES] = useState({});
  const [regions, setRegions] = useState([]);
  const [CACHE_REGIONS, setCACHE_REGIONS] = useState({});
  const [defaultLanguage, setDefaultLanguage] = useState();
  const [defaultRegion, setDefaultRegion] = useState();
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  // const [languageId, setLanguageId] = useLocalStorage('name', '');
  const getAndCacheData = async (table, setData, setCache) => {
    const response = await getData(table);
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
    if (type === "region") {
      console.log(data,'called');
      setDefaultRegion(data);
      setRegionId(data);
    } else {
      setLanguageId(data);
      setDefaultLanguage(data);
    }
  };

  useEffect(() => {
    const ADMIN = getAdmin();
    if (ADMIN?.id) {
      setUser(ADMIN);
    }
  }, [refresh]);

  useEffect(() => {
    getAndCacheData("language", setLanguages, setCACHE_LANGUAGES).then(
      (res) => {
        if (languageId) {
          setDefaultSettings("language", languageId);
        } else {
          setDefaultSettings("language", languages[0]);
        }
      }
    );
    getAndCacheData("region", setRegions, setCACHE_REGIONS).then((res) => {
      if (regionId) {
        setDefaultSettings("region", regionId);
      } else {
        setDefaultSettings("region", regions[0]);
      }
    });
  }, [languageId, regionId]);

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
    setRefresh,
    refresh,
    user,
    setUser,
  };
  return (
    <GlobalOptions.Provider value={values}>{children}</GlobalOptions.Provider>
  );
};

export const useGlobalOptions = () => {
  return useContext(GlobalOptions);
};
