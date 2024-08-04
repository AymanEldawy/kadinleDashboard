import { toast } from "react-toastify";

import { updateItem as updateTheItem } from "../Api/globalActions";

export const useUpdate = () => {
  const updateItem = async (table, data) => {
    // let loading = toast.loading("Please wait...");
    const response = await updateTheItem(table, data);
    return response;
    // if (response.error) {
    //   // toast.update(loading, {
    //   //   render: "Oops! failed to update the content",
    //   //   type: "error",
    //   //   isLoading: false,
    //   //   autoClose: 2000,
    //   // });
    // } else {
    //   // toast.update(loading, {
    //   //   render: "Great! Content has been updated successfully",
    //   //   type: "success",
    //   //   isLoading: false,
    //   //   autoClose: 2000,
    //   // });
    // }
  };
  return { updateItem };
};
