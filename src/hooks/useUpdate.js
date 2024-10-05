import { toast } from "react-toastify";

import {
  updateItem as updateTheItem,
  upsertTheItem,
  updateManyItems,
} from "../Api/globalActions";

export const useUpdate = () => {
  const updateItem = async (table, data) => {
    const response = await updateTheItem(table, data);
    return response;
  };
  const upsertItem = async (table, data) => {
    const response = await upsertTheItem(table, data);
    return response;
  };

  const updateInItems = async (table, data, key, values) => {
    const response = await updateManyItems(table, data, key, values);
    return response;
  };

  return { updateItem, upsertItem, updateInItems };
};
