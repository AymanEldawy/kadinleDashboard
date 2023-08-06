import { toast } from "react-toastify";

import { removeItemsFrom } from "../Api/globalActions";

export const useRemove = () => {
  const removeItems = async (table, additionalData) => {
    let loadLanguage = toast.loading("Please wait...");
    const response = removeItemsFrom(table, additionalData)
    if (response.error) {
      toast.update(loadLanguage, {
        render: response.error || "Field remove, please try again",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.update(loadLanguage, {
        render: "Successfully removed",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  return { removeItems };
};
