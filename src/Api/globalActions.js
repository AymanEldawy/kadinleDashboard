import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";
import { contentFilterFetch, getAddresses, getCategories, getChartContent, getChartData, getCollections, getColors, getComments, getCountries, getNews, getOffers, getOrders, getOrderStatus, getPoints, getProductFeatures, getProducts, getReturnRequests, getReturnStatus, getShowreels, getSizes, getStocks, getUserAddresses, getUsers, getUsersCart, getUserSubTable, getWarehouseAvailability, getWarehouses, normalFetch, normalFetchWithPagination } from "./data";
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
  user_like: getUserSubTable("user_like"),
  user_suggestion: getUserSubTable("user_suggestion"),
  user_ticket: getUserSubTable("user_ticket"),
  user_wallet: getUserSubTable("user_wallet"),
  user_point: getUserSubTable("user_point"),
  stock: getStocks,
  warehouse: getWarehouses,
  warehouse_availability: getWarehouseAvailability,
  order_return_request: getReturnRequests,
  order_status: getOrderStatus,
  return_status: getReturnStatus,
  news: getNews,
  user: getUsers,
  recent_user: getRecentUser,
};

export const getTableDataWithPagination = async (
  table,
  page,
  pageSize,
  additionalData
) => {
  if (table && fetches.hasOwnProperty(table)) {
    const fetchData = fetches[table];
    // const response = await fetchData({
    //   table,
    //   page,
    //   pageSize,
    //   languageId,
    //   regionId,
    //   filter,
    // });
    // const response = await fetchData(page, pageSize, filter);
    const response = await fetchData(page, pageSize, additionalData);

    return response;
  } else {
    const response = normalFetchWithPagination(table, page, pageSize);
    return response;
  }
};

export const getTableData = async (table, additionalData) => {
  console.log(
    "🚀 ~ file: globalActions.js:103 ~ getTableData ~ additionalData:",
    additionalData
  );
  const response =
    table?.indexOf("_content") !== -1
      ? await contentFilterFetch(table, additionalData)
      : await normalFetch(table, additionalData);
  return response;
};

export const getRowsByIds = async (table, col, itemIds) => {
  const response = await supabase.from(table).select("*").in(col, itemIds);
  return response;
};
export const getRowsById = async (table, col, itemId) => {
  const response = await supabase.from(table).select("*").eq(col, itemId);
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
  if (!response?.error) {
    for (const id of ids) {
      await addNewItem("logs", {
        description: `Deleted item from ${table}`,
        row_id: id,
        table_name: table,
      });
    }
  } else {
    await addNewItem("logs", {
      description: `Failed to Delete item from ${table}`,
      row_id: ids?.[0],
      table_name: table,
    });
  }
  return response;
};
export const deleteItem = async (table, id) => {
  const response = await supabase.from(table).delete().eq("id", id);
  if (!response?.error) {
    await addNewItem("logs", {
      description: `Deleted item from ${table}`,
      row_id: id,
      table_name: table,
    });
  } else {
    await addNewItem("logs", {
      description: `Failed to Delete item from ${table}`,
      row_id: id,
      table_name: table,
    });
  }
  return response;
};

// update items
export const updateItem = async (table, item) => {
  const response = await supabase.from(table).update(item).eq("id", item?.id);
  if (!response?.error) {
    await addNewItem("logs", {
      description: `Update item from ${table}`,
      row_id: item?.id,
      table_name: table,
    });
  } else {
    await addNewItem("logs", {
      description: `Error Failed to Update item from ${table}`,
      row_id: item?.id,
      table_name: table,
    });
  }
  // .single();
  return response;
};
