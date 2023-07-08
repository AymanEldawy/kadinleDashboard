import { useState } from "react";
import { toast } from "react-toastify";

import { getTableData } from "../Api/globalActions";

export const useFetch = () => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const getData = async (table) => {
    setLoading(true);
    let loadLanguage = toast.loading("Please wait...");
    const response = await getTableData(table);
    if (response.error) {
      toast.update(loadLanguage, {
        render: "Oops! Field to fetch data",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.update(loadLanguage, {
        render: "Successfully fetch data",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    }
    setLoading(false);
    return response?.data || [];
  };

  return { loading, data, getData };
};
