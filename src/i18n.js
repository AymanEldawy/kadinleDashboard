import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en', // Default language
  debug: true, // Enable debugging for development
  interpolation: {
    escapeValue: false, // React already escapes data
  },
  backend: {
    loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
  },
  detection: {
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'], // Detect language from these sources
    caches: ['localStorage', 'cookie'], // Save the selected language
  },
});

export default i18n;
