import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";
import {
  contentFilterFetch,
  getAddresses,
  getCategories,
  getChartContent,
  getChartData,
  getCollections,
  getColors,
  getComments,
  getCountries,
  getNews,
  getOffers,
  getOrders,
  getOrderStatus,
  getPoints,
  getProductFeatures,
  getProducts,
  getReturnRequests,
  getReturnStatus,
  getShowreels,
  getSizes,
  getStocks,
  getUserAddresses,
  getUserInvite,
  getUserLike,
  getUsersCart,
  getUserSubTable,
  getWarehouseAvailability,
  getWarehouses,
  normalFetch,
  normalFetchWithPagination,
} from "./data";
import { getRecentUser } from "./statictes";

const fetches = {
  address: getAddresses,
  category: getCategories,
  chart: getChartContent,
  chart_data: getChartData,
  color: getColors,
  country: getCountries,
  size: getSizes,
  collection: getCollections,
  comment: getComments,
  fabric: getProductFeatures("fabric_content"),
  material: getProductFeatures("material_content"),
  lining: getProductFeatures("lining_content"),
  collar: getProductFeatures("collar_content"),
  sleeve: getProductFeatures("sleeve_content"),
  season: getProductFeatures("season_content"),
  feature: getProductFeatures("feature_content"),
  pattern: getProductFeatures("pattern_content"),
  offer: getOffers,
  product: getProducts,
  order: getOrders,
  point: getPoints,
  user_address: getUserAddresses,
  user_cart: getUsersCart,
  user_invite: getUserSubTable("user_invite"),
  user_Like: getUserSubTable("user_Like"),
  user_Suggestion: getUserSubTable("user_Suggestion"),
  user_Ticket: getUserSubTable("user_Ticket"),
  user_Wallet: getUserSubTable("user_Wallet"),
  user_Point: getUserSubTable("user_Point"),
  stock: getStocks,
  warehouse: getWarehouses,
  warehouse_availability: getWarehouseAvailability,
  // showreel: getShowreels,
  order_return_request: getReturnRequests,
  order_status: getOrderStatus,
  return_status: getReturnStatus,
  news: getNews,
  recent_user: getRecentUser(),
};

export const getTableDataWithPagination = async (table, page, pageSize) => {
  if (table && fetches.hasOwnProperty(table)) {
    const fetchData = fetches[table];
    const response = await fetchData(page, pageSize);
    return response;
  } else {
    const response = normalFetchWithPagination(table, page, pageSize);
    return response;
  }
};

export const getTableData = async (table) => {
  const response =
    table?.indexOf("_content") !== -1
      ? await contentFilterFetch(table)
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
export const deleteItem = async (table, id) => {
  const response = await supabase.from(table).delete().eq("id", id);
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
