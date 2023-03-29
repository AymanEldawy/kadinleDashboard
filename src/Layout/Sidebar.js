import * as React from "react";

import { menuData } from "../Helpers/menu";
import { Link } from "react-router-dom";
import { ChevronIcon } from "../Helpers/Icons";

const Sidebar = ({ open }) => {
  const [dropdown, setDropdown] = React.useState(false);

  const handleClick = (key, level) => {
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
          <li key={item?.name}
            className={`relative group w-full border-b border-gray-200 py-2 ${
              dropdown[level] == item?.name
                ? "bg-gray-100 bg_dark border-b border-t border-gray-200"
                : ""
            }`}
          >
            <button
              className={`whitespace-nowrap gap-3 flex justify-between items-center hover:text-blue-600  dark:hover:bg-transparent dark:hover:text-white py-2 w-full ${
                dropdown[level] == item?.name
                  ? " text-blue-600 dark:text-white"
                  : ""
              } `}
              onClick={() => handleClick(item?.name, level)}
            >
              <span className="scale-[80%]">{item?.icon}</span>
              {item.name}
              <span
                className={`scale-[60%] ml-auto rtl:mr-auto pl-2 rtl:pr-2 -rotate-90 transition-transform duration-200 ${
                  dropdown[level] == item?.name ? "rotate-0" : ""
                }`}
              >
                <ChevronIcon />
              </span>
            </button>
            {dropdown[level] == item?.name ? (
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
            className={`relative group w-full ${
              dropdown[level] == item?.name
                ? "bg-gray-100 bg_dark border-b border-t border-gray-200"
                : ""
            }`}
          >
            <button
              className={`whitespace-nowrap gap-3 justify-between hover:text-blue-600 py-2 hover:bg-gray-100 dark:hover:bg-transparent dark:hover:text-white px-4 w-full flex ${
                dropdown[level] == item?.name
                  ? " text-blue-600 dark:text-white"
                  : ""
              } `}
              onClick={() => handleClick(item?.name, level)}
            >
              {item.name}
              <span
                className={`scale-[60%] ml-auto rtl:mr-auto pl-2 rtl:pr-2 -rotate-90 transition-transform duration-200 ${
                  dropdown[level] == item?.name ? "rotate-0" : ""
                }`}
              >
                <ChevronIcon />
              </span>
            </button>
            {dropdown[level] == item?.name ? (
              <ul className="rounded-md gap-2">
                {list(item.subChild, level + 1)}
              </ul>
            ) : null}
          </li>
        );
      }
      return (
        <li key={item?.name} className="relative w-full">
          {item?.link === "" ? (
            <button className="whitespace-nowrap hover:text-blue-600 dark:hover:bg-transparent dark:hover:text-white py-2 px-4 w-full flex">
              {item.name}
            </button>
          ) : (
            <Link
              className="whitespace-nowrap  hover:text-blue-600 dark:hover:bg-transparent dark:hover:text-white py-2 px-4 w-full flex"
              to={item?.link}
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
      className={`lg:hidden fixed w-72 h-screen shadow z-50 transition-transform duration-300 bg-white dark:bg-bgmaindark ${
        open ? "left-0" : "-left-72"
      }`}
    >
      <div className="container">
        <ul className="flex-col text-gray-500 dark:text-gray-400 text-sm font-medium min-h-[40px] flex items-start justify-between capitalize">
          {list(menuData)}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
