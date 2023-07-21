import * as React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { logout } from "../Api/auth";
import LanguageBar from "../Components/LanguageBar/LanguageBar";
import RegionBar from "../Components/LanguageBar/RegionBar";
import NotificationBar from "../Components/NotificationBar/NotificationBar";
import ToggleThemeBar from "../Components/ToggleThemeBar/ToggleThemeBar";
import { ThemeContext } from "../Context/ThemeContext";
import { exitFullscreen, openFullscreen } from "../Helpers/functions";
import { FullScreenIcon, LogoutIcon } from "../Helpers/Icons";
import BallIcon from "../Helpers/Icons/BallIcon";
import BarsIcon from "../Helpers/Icons/BarsIcon";
import UserBar from "./../Components/UserBar/UserBar";

function Header({ open, setOpen, mode, setMode }) {
  const { changeTheme, theme } = useContext(ThemeContext);
  const [isFullScreen, setIsFullScreen] = useState(
    !!document.fullscreenElement
  );

  const toggleFullScreen = () => {
    if (!!document.fullscreenElement) {
      exitFullscreen();
      setIsFullScreen(true);
    } else {
      openFullscreen();
      setIsFullScreen(false);
    }
  };
  return (
    // <div className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 ">
    <header className="bg-[#144479] text-white py-2">
      <div className="flex py-2 px-4">
        <div className="flex items-center gap-4">
          <button
            className={open ? "p-2 rounded-full hover:bg-[#0002]" : ""}
            onClick={() => setOpen((prev) => !prev)}
          >
            <BarsIcon />
          </button>
          <Link to="/">Dashboard</Link>
          <div className="">{/* <SearchBar /> */}</div>
        </div>
        <div className="ml-auto :rtl:mr-auto rtl:ml-0 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <RegionBar />
            <LanguageBar />
            <div className="w-[1px] h-6 bg-gray-300" />
            <div className="divide-x-2 divide-gray-400 divide-solid" />
            <button
              onClick={toggleFullScreen}
              className="p-2 rounded-full hover:bg-[#0002]"
            >
              {/* {isFullScreen ? <FitScreenIcon /> : <FullScreenIcon />} */}
              <FullScreenIcon />
            </button>
            <ToggleThemeBar theme={theme} changeTheme={changeTheme} />
            <NotificationBar />
          </div>
          <UserBar />
        </div>
      </div>
    </header>
  );
}

export default Header;
