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
  const closeDropDown = (e) => {
    e.stopPropagation();
    setDropdown(" ");
  };

  const list = (links, level = 0) => {
    return links?.map((item) => {
      if (item?.children) {
        return (
          <li
            key={item?.name}
            onClick={() =>
              item?.children?.length ? undefined : navigate(item?.path)
            }
            className={`relative group capitalize w-full border-b border-gray-200 dark:!border-[#444] py-2 ${
              dropdown[level] === item?.name
                ? "bg-gray-100 bg_dark border-b border-t border-gray-200"
                : ""
            }`}
          >
            <button
              className={`whitespace-nowrap capitalize px-2 gap-3 flex justify-between items-center hover:text-primary-blue  dark:hover:bg-transparent dark:hover:text-white py-2 w-full ${
                dropdown[level] === item?.name
                  ? " text-primary-blue dark:text-white"
                  : ""
              } `}
              onClick={() => handleClick(item?.name, level)}
            >
              <span className="">{item?.icon}</span>
              {item?.children?.length ? (
                <span className={`flex-1 capitalize flex ${open ? "" : ""}`}>
                  {item.name}
                  <span
                    className={`scale-[60%] ml-auto capitalize rtl:mr-auto pl-2 rtl:pr-2 -rotate-90 transition-transform duration-200 ${
                      dropdown[level] === item?.name ? "rotate-0" : ""
                    }`}
                  >
                    <ChevronIcon />
                  </span>
                </span>
              ) : (
                <Link
                  to={item?.path}
                  // onClick={() => setOpen(false)}
                  className={`flex-1 capitalize flex ${open ? "" : ""} ${
                    dropdown[level] === item?.name ||
                    item?.path === location?.pathname
                      ? "text-primary-blue"
                      : ""
                  }`}
                >
                  {item?.name}
                </Link>
              )}
            </button>
            {dropdown[level] === item?.name ? (
              <ul className="flex flex-col rounded-md">
                {list(item.children, level + 1)}
              </ul>
            ) : null}
          </li>
        );
      }
      if (item?.subChild) {
        return (
          <li
            key={item?.name}
            // onClick={() => navigate(item?.path)}
            className={`relative group w-full capitalize dark:border-[#444] ${
              dropdown[level] === item?.name
                ? "bg-gray-100 bg_dark border-b border-t border-gray-200"
                : ""
            }`}
          >
            <button
              className={`whitespace-nowrap gap-3 capitalize justify-between hover:text-primary-blue py-2 hover:bg-gray-100 dark:hover:bg-transparent dark:hover:text-white px-4 w-full flex ${
                dropdown[level] === item?.name ||
                item?.path === location?.pathname
                  ? " text-primary-blue dark:text-white"
                  : ""
              } `}
              onClick={() => handleClick(item?.name, level)}
            >
              {item.name}
              <span
                className={`scale-[60%] ml-auto capitalize rtl:mr-auto pl-2 rtl:pr-2 -rotate-90 transition-transform duration-200 ${
                  dropdown[level] === item?.name ? "rotate-0" : ""
                }`}
              >
                <ChevronIcon />
              </span>
            </button>
            {dropdown[level] === item?.name ? (
              <ul className="rounded-md gap-2">
                {list(item.subChild, level + 1)}
              </ul>
            ) : null}
          </li>
        );
      }
      return (
        <li
          key={item?.name}
          // onClick={() => navigate(item?.path)}
          className="relative w-full capitalize"
        >
          {item?.path === "" ? (
            <button className="whitespace-nowrap capitalize hover:text-primary-blue dark:hover:bg-transparent dark:hover:text-white py-2 px-4 w-full flex">
              {item.name}
            </button>
          ) : (
            <Link
              className={`whitespace-nowrap capitalize hover:text-primary-blue dark:hover:bg-transparent dark:hover:text-white py-2 px-4 w-full flex ${
                dropdown[level] === item?.name ||
                item?.path === location?.pathname
                  ? " text-primary-blue dark:text-white"
                  : ""
              }`}
              to={item?.path}
              // onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          )}
        </li>
      );
    });
  };
  return (
    <aside
      className={`h-[100dvh] top-0 sticky shadow overflow-hidden flex flex-col z-50 transition-all duration-300 bg-white dark:bg-bgmaindark ${
        open ? "translate-x-0 min-w-[250px] " : "w-12 overflow-x-hidden"
      } hover:w-[250px]`}
      onMouseLeave={() => (dropdown && !open ? setDropdown("") : undefined)}
    >
      <div className=" h-20 flex items-center justify-center ">
        <img
          src={open ? logo : logoIcon}
          alt="kaindle logo"
          className={`${open ? "w-44" : "w-8"} object-contain`}
        />
      </div>
      <ul className="flex-col flex-1 overflow-auto text-gray-500 dark:text-gray-400 text-sm font-medium min-h-[40px] flex items-start justify-between capitalize">
        {list(menuData.sort((a, b) => a.name.localeCompare(b.name)))}
      </ul>
    </aside>
  );
};

export default Sidebar;
