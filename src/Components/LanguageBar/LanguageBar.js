import React from "react";
import { LanguageIcon } from "../../Helpers/Icons";
import spain from "../../Assets/Images/Flags/spain.svg";
import china from "../../Assets/Images/Flags/china.svg";
import french from "../../Assets/Images/Flags/french.svg";
import italy from "../../Assets/Images/Flags/italy.svg";
import germany from "../../Assets/Images/Flags/germany.svg";
import us from "../../Assets/Images/Flags/us.svg";
import russia from "../../Assets/Images/Flags/russia.svg";
import arabic from "../../Assets/Images/Flags/arabic.webp";
import { useState } from "react";

const languages = [
  { lang: us, name: "English" },
  { lang: spain, name: "Española" },
  { lang: french, name: "français" },
  { lang: germany, name: "Deutsche" },
  { lang: russia, name: "русский" },
  { lang: china, name: "中国人" },
  { lang: italy, name: "Italian" },
  { lang: arabic, name: "Arabic" },
];
const LanguageBar = () => {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  const changeLanguage = (lang) => setSelectedLang(lang);
  return (
    <div className="relative">
      {open ? (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black opacity-75"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <button
        className="p-2 rounded-full hover:bg-[#0002] relative"
        onClick={() => setOpen(true)}
      >
        <img
          src={selectedLang?.lang}
          alt={selectedLang?.name}
          className="w-5 h-5"
        />
      </button>

      {open ? (
        <ul className="absolute bg-white left-0 p-3 px-6 min-w-[200px] dark:bg-bgmaindark shadow rounded-md top-12 z-50 text-gray-500 text-sm flex flex-col gap-3">
          {languages?.map((language) => (
            <li
              key={language?.name}
              onClick={() => {
                changeLanguage(language);
                setOpen(false);
              }}
              className="flex items-center gap-4 cursor-pointer font-medium hover:text-gray-900 dark:hover:text-gray-200"
            >
              <img
                className="w-4 h-4"
                src={language?.lang}
                alt={language?.name}
              />
              {language?.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default LanguageBar;
