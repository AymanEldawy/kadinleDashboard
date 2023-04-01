import axios from "axios";
import React, { createContext, useReducer } from "react";
import { useState } from "react";

export const ListsGuidsContext = createContext();
const guidListCached = {};

const getTableData = async (table, addTableList) => {
  return await axios
    .post(`/list`, {
      table,
    })
    .then((res) => {
      let data = res?.data?.recordset;
      // setLists(data);
      addTableList(table, data);
      return data;
    });
};

export const ListsGuidsProvider = ({ children }) => {
  const [lists, setLists] = useState("");
  // const [guid, set]
  const addTableList = (name, data) => {
    setLists((prev) => {
      return {
        ...prev,
        [name]: data,
      };
    });
  };

  const getGuidName = (table, guid) => {
    if (!guidListCached[guid]) {
      if (lists[table]) {
        lists?.[table]?.forEach((item) => {
          guidListCached[item?.Guid] = item?.Name;
        });
      } else {
        getTableData(table, addTableList)
      }
    }
    return guidListCached[guid] || "";
  };

  return (
    <ListsGuidsContext.Provider
      value={{ lists, addTableList, getGuidName, guidListCached }}
    >
      {children}
    </ListsGuidsContext.Provider>
  );
};
