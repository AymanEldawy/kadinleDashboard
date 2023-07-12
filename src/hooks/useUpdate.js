import { updateItem as updateTheItem } from "../Api/globalActions";
import { toast } from "react-toastify";

export const useUpdate = () => {
  const updateItem = async (table, data) => {
    let loading = toast.loading("Please wait...");
    const response = await updateTheItem(table, data);
    if (response.error) {
      toast.update(loading, {
        render: "Oops! failed to update the content",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } else {
      toast.update(loading, {
        render: "Great! Content has been updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
      return response;
    }
  };
  return { updateItem };
};
