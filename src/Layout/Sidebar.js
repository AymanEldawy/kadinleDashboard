import * as React from "react";

import { menuData } from "../Helpers/menu";
import { Link } from "react-router-dom";

function Sidebar({ setOpen, open, classes }) {
  const [dropdown, setDropdown] = React.useState(false);
  const [subDropdown, setSubDropdown] = React.useState(false);
  const handleClick = (key) => {
    if (dropdown === key) setDropdown("");
    else setDropdown(key);
  };
  const handleSubDropdown = (key) => {
    if (subDropdown === key) setSubDropdown("");
    setSubDropdown(key);
  };
  console.log(dropdown, subDropdown);
  const list = (links) => {
    return links?.map((item) => {
      if (item?.children) {
        return (
          <li>
            <button onClick={() => handleClick(item?.key)}>
              {item.name}
              {dropdown === item?.key ? "-" : "+"}
            </button>
            <ul className={`${dropdown === item?.key ? "" : ""}`}>
              {list(item.children)}
            </ul>
          </li>
        );
      }
      if (item?.subChild) {
        return (
          <ul>
            <button onClick={() => handleSubDropdown(item?.key)}>
              {item.name} {subDropdown === item?.key ? "-" : "+"}
            </button>
            <ul
              className={`${subDropdown === item?.key ? "" : ""}`}
              timeout="auto"
              unmountOnExit
            >
              {list(links.subChild)}
            </ul>
          </ul>
        );
      }
      return (
        <li>
          {item?.link === "" ? (
            <button>{item.name}</button>
          ) : (
            <Link to={item?.link}>{item.name}</Link>
          )}
        </li>
      );
    });
  };
  return (
    <aside
    // className={classes.sidebarMinWidth}
    // anchor={"left"}
    // open={open}
    // onClose={() => setOpen(false)}
    // onOpen={() => setOpen(true)}
    >
      {list(menuData)}
    </aside>
  );
}

export default Sidebar;
