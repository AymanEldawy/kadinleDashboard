import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logoIcon from "../Assets/Images/logo-icon.png";
import logo from "../Assets/Images/logo.svg";
import { ChevronIcon } from "../Helpers/Icons";
import { menuData } from "../Helpers/menu";

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!open) setDropdown("");
  }, [open]);
  const handleClick = (key, level) => {
    // if (!open) return;
    if (dropdown[level] == key) {
      setDropdown((prev) => {
        return { ...prev, [level]: "" };
      });
    } else {
      setDropdown((prev) => {
        return { ...prev, [level]: key };
      });
    }
  };

  const list = (links, level = 0) => {
    return links?.map((item) => {
      if (item?.groupTitle) {
        return (
          <div key={item?.groupTitle} className="w-full">
            <div>
              <small
                className={`text-primary-blue px-2 ${open ? "" : "hidden"}`}
              >
                {item?.groupTitle}
              </small>
              <ul className="w-full mt-2">
                {list(item?.groupList, level + 1)}
              </ul>
            </div>
            <div className="my-3 border-b :last-border-b-0 w-full h-[1px]" />
          </div>
        );
      }
      if (item) {
        return (
          <li
            key={item?.name}
            onClick={() =>
              item?.groupList?.length ? undefined : navigate(item?.path)
            }
            className={`relative group capitalize w-full ltr:pl-3 rtl:pr-3 flex items-center ${
              item?.path === location?.pathname
                ? "bg-blue-100 text-primary-blue dark:bg-[#444]"
                : ""
            }`}
          >
            <span className="text-inherit">{item?.icon}</span>
            <Link
              className={`whitespace-nowrap capitalize hover:text-primary-blue dark:hover:bg-transparent dark:hover:text-white py-2 px-4 w-full flex ${
                dropdown[level] === item?.name ||
                item?.path === location?.pathname
                  ? " text-primary-blue dark:text-white"
                  : ""
              }`}
              to={item?.path}
            >
              {item.name}
            </Link>
          </li>
        );
      }
    });
  };
  return (
    <aside
      className={`hide-scroll h-[100dvh] top-0 sticky shadow overflow-hidden flex flex-col z-50 transition-all duration-300 bg-white dark:bg-bgmaindark ${
        open ? "translate-x-0 min-w-[250px] " : "w-12 overflow-x-hidden"
      } hover:w-[250px]`}
      onMouseLeave={() => (dropdown && !open ? setDropdown("") : undefined)}
    >
      <Link to="/" className=" h-20 flex items-center justify-center ">
        <img
          src={open ? logo : logoIcon}
          alt="kaindle logo"
          className={`${open ? "w-44" : "w-8"} object-contain`}
        />
      </Link>
      <div className="flex-col flex-1 hide-scroll overflow-auto text-gray-500 dark:text-gray-400 text-sm font-medium min-h-[40px] flex items-start justify-between capitalize">
        {list(menuData)}
      </div>
    </aside>
  );
};

export default Sidebar;
