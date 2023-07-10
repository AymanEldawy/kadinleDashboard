import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";
import {
  getAddresses,
  getCategories,
  getChartContent,
  getChartData,
  getColors,
  getCountries,
  getSizes,
  uuidLanguageEn,
} from "./data";

// get data
const IGNORE_LANGUAGES = ["size", "size_content", "language", "brand"];

const fetches = {
  address: getAddresses(),
  category: getCategories(),
  chart: getChartContent(),
  chart_data: getChartData(),
  color: getColors(),
  country: getCountries(),
  size: getSizes(),
};

const normalFetch = async (table) => {
  console.log(table);
  if (table?.indexOf("_content") && !IGNORE_LANGUAGES?.includes(table)) {
    const response = await supabase
      .from(table)
      .select()
      .eq("language_id", uuidLanguageEn);
    return response;
  } else {
    const response = await supabase.from(table).select();
    return response;
  }
};

export const getTableData = async (table) => {
  console.log(table);
  const response = fetches.hasOwnProperty(table)
    ? await fetches[table]
    : await normalFetch(table);
  return response;
};
export const getTableDataById = async (table, itemId) => {
  console.log(table, itemId);
  const response = await supabase.from(table).select("*").eq("id", itemId);
  // .eq("language_id", en);
  return response;
};

// add new item
export const addNewItem = async (table, item) => {
  const response = await supabase.from(table).insert(item).select("id");
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
