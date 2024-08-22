import { toast } from "react-toastify";

import { updateItem as updateTheItem, upsertTheItem } from "../Api/globalActions";

export const useUpdate = () => {
  const updateItem = async (table, data) => {
    const response = await updateTheItem(table, data);
    return response;
  };
  const upsertItem = async (table, data) => {
    const response = await upsertTheItem(table, data);
    return response;
  };
  return { updateItem, upsertItem };
};
