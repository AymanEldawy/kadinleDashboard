import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";

// get data
export const getTableData = async (table) => {
  const response = await supabase.from(table).select();
  return response;
};

// add new item
export const addNewItem = async (table, item) => {
  const response = await supabase.from(table).insert(item).select();
  return response;
};

// delete items
export const deleteItems = async (table, ids) => {
  const response = await supabase.from(table).delete().in("id", ids);
  return response;
};

// update items
export const updateItem = async (table, item, itemId) => {
  const response = await supabase
    .from(table)
    .update(item)
    .eq("id", itemId)
    .single();
  return response;
};
