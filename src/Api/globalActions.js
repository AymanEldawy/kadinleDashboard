import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";
import {
  getAddresses,
  getCategories,
  getChartContent,
  getChartData,
  getCollections,
  getColors,
  getComments,
  getCountries,
  getOffers,
  getOrders,
  getPoints,
  getProductFeatures,
  getProducts,
  getSizes,
  getUserAddresses,
  getUserInvite,
  getUsersCart,
  uuidLanguageEn,
} from "./data";

const fetches = {
  address: getAddresses(),
  category: getCategories(),
  chart: getChartContent(),
  chart_data: getChartData(),
  color: getColors(),
  country: getCountries(),
  size: getSizes(),
  collection: getCollections(),
  comment: getComments(),
  fabric: getProductFeatures("fabric_content"),
  material: getProductFeatures("material_content"),
  lining: getProductFeatures("lining_content"),
  collar: getProductFeatures("collar_content"),
  sleeve: getProductFeatures("sleeve_content"),
  season: getProductFeatures("season_content"),
  feature: getProductFeatures("feature_content"),
  pattern: getProductFeatures("pattern_content"),
  offer: getOffers(),
  product: getProducts(),
  order: getOrders(),
  point: getPoints(),
  user_address: getUserAddresses(),
  user_cart: getUsersCart(),
  user_invite: getUserInvite(),
};
const normalFetch = async (table) => {
  const response = await supabase.from(table).select();
  return response;
};

export const getTableData = async (table) => {
  console.log(table);
  const response = fetches.hasOwnProperty(table)
    ? await fetches[table]
    : await normalFetch(table);
  return response;
};
export const getTableDataById = async (table, itemId) => {
  const response = await supabase.from(table).select("*").eq("id", itemId);
  return response;
};
export const getTableContentDataById = async (table, itemId) => {
  const response = await supabase
    .from(`${table}_content`)
    .select("*")
    .eq(`${table}_id`, itemId);
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
export const updateItem = async (table, item) => {
  const response = await supabase
    .from(table)
    .update(item)
    .eq("id", item?.id)
    .single();
  return response;
};
