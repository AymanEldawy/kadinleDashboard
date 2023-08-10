"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getUser } from "../Api/auth";
import { ADMIN } from "../Api/globalActions";
import { useNavigate } from "react-router-dom";

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
  const [refresh, serRefresh] = useState(false);
  const [refreshLayout, serRefreshLayout] = useState(false);
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
      setDefaultRegion(data);
      setRegionId(data);
    } else {
      setLanguageId(data);
      setDefaultLanguage(data);
    }
    serRefreshLayout((p) => !p);
  };

  useEffect(() => {
    if (ADMIN?.id) {
      setUser(ADMIN);
    } else {
      getUser().then((res) => {
        setUser(res);
        if (res?.id) {
          localStorage.setItem("KADINLE_ADMIN_USER", JSON.stringify(res));
        }
      });
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
    serRefresh,
    refresh,
    user,
  };
  return (
    <GlobalOptions.Provider value={values}>{children}</GlobalOptions.Provider>
  );
};

export const useGlobalOptions = () => {
  return useContext(GlobalOptions);
};
