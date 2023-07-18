import { useState } from "react";
import { toast } from "react-toastify";

import { addNewItem } from "../Api/globalActions";

export const useAdd = () => {
  const [status, setStatus] = useState("");

  const addItem = async (table, data) => {
    let loading = toast.loading("Please wait...");
    const response = await addNewItem(table, data);
    const itemId = response?.data?.[0]?.id;
    if (itemId) {
      await addNewItem("logs", {
        description: `Added new ${table}`,
        row_id: itemId,
        table_name: table,
      });
    }
    if (response.error) {
      toast.update(loading, {
        render: "Oops! failed to added new",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
      setStatus("error");
    } else {
      toast.update(loading, {
        render: "Great! successfully added",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
      setStatus("success");
      return response;
    }
  };
  return { addItem, status };
};
