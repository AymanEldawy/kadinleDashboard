import * as React from "react";

import { menuData } from "../Helpers/menu";
import { Link } from "react-router-dom";
import { ChevronIcon } from "../Helpers/Icons";

const Menu = () => {
  const [dropdown, setDropdown] = React.useState(false);
  const [subDropdown, setSubDropdown] = React.useState(false);
  const [dropdownGroup, setDropdownGroup] = React.useState();
  const handleClick = (key) => {
    setDropdown(key);
  };
  const handleSubDropdown = (key) => {
    setSubDropdown(key);
  };
  const closeDropDown = (e) => {
    e.stopPropagation();
    setDropdown(" ");
    setSubDropdown(" ");
  };
  const list = (links) => {
    return links?.map((item) => {
      if (item?.children) {
        return (
          <li key={item?.name} className="relative group">
            <button className="whitespace-nowrap flex justify-between items-center  hover:text-blue-600  dark:hover:bg-transparent dark:hover:text-white py-2 w-full ">
              <span className="scale-[65%]">{item?.icon}</span>
              {item.name}
              <span className="scale-[60%] ml-auto rtl:mr-auto pl-2 rtl:pr-2">
                <ChevronIcon />
              </span>
            </button>
            <ul
              className={` ${
                item?.children?.length > 7
                  ? "grid grid-cols-3 min-w-[650px] items gap-2"
                  : " flex flex-col gap-2"
              } opacity-0 pointer-events-none !group-hover:opacity-1 !group-hover:pointer-events-auto absolute bg-white bg_dark shadow top-[40px] py-4 rounded-md z-[99]`}
            >
              {list(item.children)}
            </ul>
          </li>
        );
      }
      if (item?.subChild) {
        return (
          <li key={item?.name} className="relative">
            <button className="whitespace-nowrap gap-2 justify-between hover:text-blue-600 py-2 hover:bg-gray-100 dark:hover:bg-transparent dark:hover:text-white px-4 w-full flex ">
              {item.name}
              <span className="scale-[60%] -rotate-90">
                <ChevronIcon />
              </span>
            </button>
            <ul className="opacity-0 pointer-events-none absolute bg-white bg_dark shadow top-[0] py-4 rounded-md z-[99] left-full">
              {list(item.subChild)}
            </ul>
          </li>
        );
      }
      return (
        <li key={item?.name} className="relative">
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
    <div className="shadow bg-white dark:bg-bgmaindark hidden lg:block">
      <div className="container">
        <ul className="primary-menu text-gray-500 dark:text-gray-400 text-sm font-medium min-h-[40px] flex gap-1 items-center justify-between capitalize">
          {list(menuData)}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
