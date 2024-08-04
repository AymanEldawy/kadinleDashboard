import { useState } from "react";
import { toast } from "react-toastify";

import { deleteItems, deleteItem as deleteSingle } from "../Api/globalActions";

export const useDelete = () => {
  const deleteItem = async (table, ids, operation = "multi") => {
    let loadLanguage = toast.loading("Please wait...");
    const response =
      operation === "single"
        ? await deleteSingle(table, ids)
        : await deleteItems(table, Object.values(ids));
    if (response.error) {
      toast.update(loadLanguage, {
        render: response.error || "Field delete, please try again",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.update(loadLanguage, {
        render: "Successfully deleted",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  return { deleteItem };
};
