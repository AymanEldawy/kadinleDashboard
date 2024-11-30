import { useState } from "react";
import { toast } from "react-toastify";

import { deleteItems, deleteItem as deleteSingle } from "../Api/globalActions";

export const useDelete = () => {
  const deleteItem = async (
    table,
    ids,
    column,
    operation = "multi",
    showToast = true
  ) => {

    let loadLanguage = showToast ? toast.loading("Please wait...") : null;
    const response =
      operation === "single"
        ? await deleteSingle(table, ids, column)
        : await deleteItems(table, ids, column);
    if (response.error) {
      if (showToast)
        toast.update(loadLanguage, {
          render: response.error || "Field delete, please try again",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
    } else {
      if (showToast)
        toast.update(loadLanguage, {
          render: "Successfully deleted",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
    }
    return response
  };

  return { deleteItem };
};
