import { useState } from "react";

import {
  getTableContentDataById,
  getTableData,
  getTableDataById,
  getTableDataWithPagination,
} from "../Api/globalActions";
import { getTableDataWithContent } from "../Api/data";

export const useFetch = () => {
  const [loading, setLoading] = useState();
  const getDataWithPagination = async (
    table,
    page,
    pageSize,
    additionalData
  ) => {
    const response = await getTableDataWithPagination(
      table,
      page,
      pageSize,
      additionalData
    );
    return response;
  };

  const getDataWithContent = async (table, id) => {
    return await getTableDataWithContent(table, id);
  }

  const getData = async (table, id, operation = "") => {
    setLoading(true);
    // let loadLanguage = toast.loading("Please wait...");
    let response = null;
    if (operation === "content" && id) {
      response = await getTableContentDataById(table, id);
    } else {
      response = id
        ? await getTableDataById(table, id)
        : await getTableData(table);
    }
    if (response?.error) {
      // toast.update(loadLanguage, {
      //   render: "Oops! Field to fetch data",
      //   type: "error",
      //   isLoading: false,
      //   autoClose: 2000,
      // });
    } else {
      // toast.update(loadLanguage, {
      //   render: "Successfully fetch data",
      //   type: "success",
      //   isLoading: false,
      //   autoClose: 1000,
      // });
    }
    setLoading(false);

    return response?.data;
  };

  return { loading, getData, getDataWithPagination, getDataWithContent };
};
