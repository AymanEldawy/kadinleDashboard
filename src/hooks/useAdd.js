import { useState } from "react";

import { addManyItem, addNewItem, getAdmin } from "../Api/globalActions";

const ADMIN = getAdmin();

export const useAdd = () => {
  const [status, setStatus] = useState("");

  const addItem = async (table, data, operation = 'one') => {
    // let loading = toast.loading("Please wait...");
    const response = operation === 'one' ? await addNewItem(table, data) : await addManyItem(table, data);
    const itemId = response?.data?.[0]?.id;
    if ((itemId && table?.indexOf("_content") === -1) || operation !== 'one') {
      await addNewItem("logs", {
        description: `Added new ${table}`,
        row_id: itemId,
        table_name: table,
        admin_id: ADMIN?.id,
      });
    }
    if (response.error) {
      setStatus("error");
    } else {
      setStatus("success");
      return response;
    }
  };

  return { addItem, status };
};
