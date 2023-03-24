import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { PopupFormContext } from "../../Context/PopupFormContext";
import { PlusIcon } from "../../Helpers/Icons";

const Field = ({
  tableName,
  list,
  getSelectedValue,
  getSelectedValueRef,
  getSelectedValueWithIndex,
  onPlusClick,
  onChange,
  onFocus,
  label,
  className,
  ...field
}) => {
  const [value, setValue] = useState("");
  const [listFilter, setListFilter] = useState([]);
  const [selected, setSelected] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const { dispatchForm } = useContext(PopupFormContext);
  useEffect(() => {
    setListFilter(list || []);
  }, []);
  const handelFilter = useCallback(
    (val) => {
      setValue(val);
      if (val?.length > 0) setDropdown(true);
      else setDropdown(false);
      let newList = list?.filter(
        (item) => item?.name?.toLowerCase().indexOf(val?.toLowerCase()) !== -1
      );
      setListFilter(newList);
    },
    [value]
  );
  const handelSelected = useCallback(
    (item) => {
      setValue(item?.name);
      setSelected(item);
      setDropdown(false);
      if (!!getSelectedValue) getSelectedValue(field?.name, item?.id);
      if (!!getSelectedValueRef) getSelectedValueRef.current = item?.id;
      if (!!getSelectedValueWithIndex)
        getSelectedValueWithIndex(field?.index, field?.name, item?.id);
    },
    [selected]
  );

  const onCancelMenu = () => {
    if (!listFilter?.length) {
      setValue("");
      setListFilter([]);
    }
    setDropdown(false);
  };
  return (
    <div className={`relative z-20 ${dropdown ? "!z-40" : ""}`}>
      {dropdown ? (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-[#0007]"
          onClick={onCancelMenu}
        />
      ) : null}
      {label ? (
        <label className="block text-sm font-normal mb-1 capitalize">
          {label}
        </label>
      ) : null}
      <div className="relative flex items-center ">
        <input
          className={`border rounded  placeholder:text-gray-800 dark:placeholder:text-gray-500 dark:text-white p-1 w-full invalid:text-gray-800  ${className}`}
          type="text"
          id="myInput"
          value={value}
          autoComplete
          placeholder="Search here"
          onChange={(e) => {
            handelFilter(e.target.value);
            if (!!onChange) onChange();
          }}
          onFocus={() => {
            // setDropdown(true);
            if (!!onFocus) {
              onFocus();
            }
          }}
          {...field}
        />
        <button
          type="button"
          className="absolute right-2 rtl:left-2 rtl:right-auto text-blue-500 hover:text-white rounded-full hover:bg-blue-400"
          onClick={() => {
            if (onPlusClick) onPlusClick();
            console.log(tableName);
            dispatchForm({
              open: true,
              table: field?.table,
            });
          }}
        >
          <PlusIcon />
        </button>
      </div>
      {dropdown ? (
        <div className="relative rounded-md mt-2 text-sm w-full z-10 bg-white bg_dark shadow-md p-2">
          {listFilter?.length && dropdown ? (
            <ul id="myUL" className="flex flex-col gap-1">
              {listFilter?.map((item) => (
                <li
                  key={item?.id}
                  onClick={() => handelSelected(item)}
                  className={`capitalize p-1 px-3 rounded-md hover:bg-gray-200 dark:hover:bg-yellow-100 dark:hover:text-yellow-500 cursor-pointer ${
                    selected?.id === item?.id
                      ? "bg-blue-400 text-white dark:bg-yellow-100 dark:text-yellow-500"
                      : ""
                  }`}
                >
                  <a href="#">{item?.name}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="bg-red-200 text-red-500 p-1 text-sm rounded-md px-3">
              There is no results.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Field;
