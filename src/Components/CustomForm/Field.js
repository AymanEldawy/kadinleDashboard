import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { ListsGuidsContext } from "../../Context/ListsGuidsContext";
import { PopupFormContext } from "../../Context/PopupFormContext";
import { PlusIcon } from "../../Helpers/Icons";
import { AlertContext } from "../../Context/AlertContext";
const Field = ({
  table,
  tableForHashed,
  list: defaultList,
  getSelectedValue,
  getSelectedValueRef,
  getSelectedValueWithIndex,
  onPlusClick,
  onChange,
  onFocus,
  label,
  className,
  required,
  value: val,
  allowSelect,
  ...field
}) => {
  const [value, setValue] = useState("");
  const [listFilter, setListFilter] = useState([]);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const { dispatchForm } = useContext(PopupFormContext);
  const { addTableList, lists, getGuidName } = useContext(ListsGuidsContext);
  const { dispatchAlert } = useContext(AlertContext);
  useEffect(() => {
    if (table) {
      async function fetch() {
        // console.log("tesseting");
        return await axios
          .post(`/list`, {
            table: table,
          })
          .then((res) => {
            let data = res.data.recordset;
            // console.log(data, "---");
            setList(data);
            if (data?.length > 0) addTableList(table || "unknown", data || []);
          });
      }
      if (!lists[table]) {
        fetch();
      } else {
        // console.log("rrrr", lists, table);
        setList(lists[table]);
      }
    }
  }, [table]);

  useEffect(() => {
    if (defaultList?.length) {
      setList(defaultList);
    }
    if (!lists[tableForHashed]) {
      addTableList(tableForHashed, defaultList);
    }
  }, [defaultList]);
  // console.log(list);
  useEffect(() => {
    let tableName = table || tableForHashed;
    if (val) setValue(getGuidName(tableName, val));
    else setValue("");
  }, [val]);

  const handelFilter = useCallback(
    (val) => {
      setValue(val);
      if (val?.length > 0) setDropdown(true);
      else setDropdown(false);

      let newList = list?.filter((item) =>
        item?.Name?.toLowerCase().startsWith(val?.toLowerCase())
      );
      // console.log(newList);
      setListFilter(newList);
    },
    [value, list]
  );
  const handelSelected = useCallback(
    (item) => {
      if (!!allowSelect && allowSelect(item?.Guid)) {
        console.log("cant select it");
        dispatchAlert({
          type: "error",
          msg: "Oops! Can't Select this Name again",
          open: true,
        });
        return;
      }
      setValue(item?.Name);
      setSelected(item);
      setDropdown(false);
      if (!!getSelectedValue)
        getSelectedValue(field?.name, item?.Guid, required);
      if (!!getSelectedValueRef) getSelectedValueRef.current = item?.Guid;
      if (!!getSelectedValueWithIndex)
        getSelectedValueWithIndex(field?.index, field?.name, item?.Guid);
    },
    [selected]
  );
  // console.log(list);
  const onCancelMenu = () => {
    if (!listFilter?.length) {
      setListFilter([]);
    }
    setValue("");
    setSelected("");
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
        <label className="overflow-hidden text-ellipsis block text-sm font-normal mb-1 capitalize">
          {label}
        </label>
      ) : null}
      <div className="relative flex items-center ">
        <input
          className={`border rounded  placeholder:text-gray-800 dark:placeholder:text-gray-500 dark:text-white p-1 w-full invalid:text-gray-800  ${className}`}
          type="text"
          id="myInput"
          value={value}
          autoComplete="on"
          placeholder="Search here"
          onBlur={(e) => {
            if (e.target.value === "") {
              if (!!getSelectedValue)
                getSelectedValue(field?.name, "", required);
              if (!!getSelectedValueRef) getSelectedValueRef.current = "";
              if (!!getSelectedValueWithIndex)
                getSelectedValueWithIndex(field?.index, field?.name, "");
            }
          }}
          onChange={(e) => {
            handelFilter(e.target.value);
            if (!!onChange) onChange();
          }}
          onFocus={() => {
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
            dispatchForm({
              open: true,
              table: field?.table || tableForHashed || "",
            });
          }}
        >
          <PlusIcon circle />
        </button>
      </div>
      {dropdown ? (
        <div className="absolute rounded-md mt-2 text-sm w-full z-10 bg-white bg_dark shadow-md p-2">
          {listFilter?.length && dropdown ? (
            <ul id="myUL" className="flex flex-col gap-1">
              {listFilter?.map((item) => (
                <li
                  key={item?.Name}
                  onClick={(e) => {
                    e.stopPropagation();
                    handelSelected(item);
                  }}
                  className={`capitalize p-1 px-3 rounded-md hover:bg-gray-200 cursor-pointer ${
                    selected?.Guid === item?.Guid
                      ? "bg-blue-400 text-white"
                      : ""
                  }`}
                >
                  <a href="#">{item?.Name}</a>
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
