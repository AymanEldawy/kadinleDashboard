import React from "react";
import { MoonIcon, SunIcon } from "../../Helpers/Icons";

const ToggleThemeBar = ({ theme, changeTheme }) => {
  return (
    <button
      onClick={changeTheme}
      className="p-2 rounded-full hover:bg-[#0002]"
    >
      {theme !== "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ToggleThemeBar;
