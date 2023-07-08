"use client";
import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();
export const LangContextProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  const changeLang = (lang) => {
    setLang(lang);
  };
  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.body.style.direction = dir;
    document.body.setAttribute("dir", dir);
  }, [lang]);
  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
