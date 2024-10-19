import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";
import {
  contentFilterFetch,
  getAddresses,
  getBillReports,
  getBills,
  getCategories,
  getChartContent,
  getChartData,
  getChats,
  getCollections,
  getCollectionsProducts,
  getColors,
  getComments,
  getCountries,
  getHomeSliders,
  getLogs,
  getNews,
  getOffers,
  getOrderReports,
  getOrders,
  getOrderStatus,
  getPoints,
  getProducts,
  getReturnRequests,
  getReturnStatus,
  getRooms,
  getSales,
  getShippingPrices,
  getShowreels,
  getSizes,
  getStocks,
  getSupplierProducts,
  getSuppliers,
  getSuppliersRequests,
  getUserAddresses,
  getUserLikes,
  getUserPoints,
  getUsers,
  getUsersCart,
  getUserSubTable,
  getWarehouseAvailability,
  getWarehouses,
  normalFetch,
  normalFetchWithPagination,
} from "./data";
import { getRecentUser } from "./statictes";
import Cookies from "js-cookie";

export const getAdmin = () => {
  return Cookies.get("KADINLE_ADMIN")
    ? JSON.parse(Cookies.get("KADINLE_ADMIN"))
    : null;
};

export const ADMIN = getAdmin();

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
  offer: getOffers,
  product: getProducts,
  order: getOrders,
  point: getPoints,
  user_address: getUserAddresses,
  user_like: getUserLikes,
  user_cart: getUsersCart,
  user_invite: (page, pageSize, additionalData) =>
    getUserSubTable("user_invite", page, pageSize, additionalData),
  user_suggestion: (page, pageSize, additionalData) =>
    getUserSubTable("user_suggestion", page, pageSize, additionalData),
  user_ticket: (page, pageSize, additionalData) =>
    getUserSubTable("user_ticket", page, pageSize, additionalData),
  user_wallet: (page, pageSize, additionalData) =>
    getUserSubTable("user_wallet", page, pageSize, additionalData),
  // user_point: (page, pageSize, additionalData) => getUserSubTable("user_point", page, pageSize, additionalData),
  user_point: (page, pageSize, additionalData) =>
    getUserPoints(page, pageSize, additionalData),
  stock: getStocks,
  warehouse: getWarehouses,
  warehouse_availability: getWarehouseAvailability,
  order_return_request: getReturnRequests,
  order_status: getOrderStatus,
  return_status: getReturnStatus,
  news: getNews,
  user: getUsers,
  recent_user: getRecentUser,
  logs: getLogs,
  collection_products: getCollectionsProducts,
  shipping_price: getShippingPrices,
  bill: getBills,
  order_report: getOrderReports,
  bill_report: getBillReports,
  chat: getChats,
  rooms: getRooms,
  supplier_request: getSuppliersRequests,
  supplier: getSuppliers,
  less_than: (page, pageSize, additionalData) =>
    getHomeSliders("less_than", page, pageSize, additionalData),
  home_sliders: (page, pageSize, additionalData) =>
    getHomeSliders("home_sliders", page, pageSize, additionalData),
  definitions: (page, pageSize, additionalData) =>
    getHomeSliders("definitions", page, pageSize, additionalData),
  supplier_products: getSupplierProducts,
  sale: getSales,
};

export const getTableDataWithPagination = async (
  table,
  page,
  pageSize,
  additionalData
) => {
  if (table && fetches.hasOwnProperty(table)) {
    const fetchData = fetches[table];
    const response = await fetchData(page, pageSize, additionalData);

    return response;
  } else {
    const response = normalFetchWithPagination(
      table,
      page,
      pageSize,
      additionalData
    );

    return response;
  }
};

export const getTableData = async (table, additionalData) => {
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
// add many item
export const addManyItem = async (table, items) => {
  const response = await supabase.from(table).insert(items);
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
        admin_id: ADMIN?.id,
      });
    }
  } else {
    await addNewItem("logs", {
      description: `Failed to Delete item from ${table}`,
      row_id: ids?.[0],
      table_name: table,
      admin_id: ADMIN?.id,
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
      admin_id: ADMIN?.id,
    });
  } else {
    await addNewItem("logs", {
      description: `Failed to Delete item from ${table}`,
      row_id: id,
      table_name: table,
      admin_id: ADMIN?.id,
    });
  }
  return response;
};
export const removeItemsFrom = async (table, additionalData) => {
  let { ids } = additionalData;
  const query = supabase.from(table).delete().in("product_id", ids);
  if (additionalData?.col2) {
    query.eq(additionalData?.col, additionalData?.table_id);
  }
  const response = await query;
  if (!response?.error) {
    await addNewItem("logs", {
      description: `Removed item from ${table}`,
      row_id: ids?.[0],
      table_name: table,
      admin_id: ADMIN?.id,
    });
  } else {
    await addNewItem("logs", {
      description: `Failed to Remove item from ${table}`,
      row_id: ids?.[0],
      table_name: table,
      admin_id: ADMIN?.id,
    });
  }
  return response;
};

// update items
export const upsertTheItem = async (table, item) => {
  const response = await supabase.from(table).upsert(item);
  return response;
};
// update items
export const updateManyItems = async (table, item, key, values) => {
  const response = await supabase.from(table).update(item).in(key, values);
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
      admin_id: ADMIN?.id,
    });
  } else {
    await addNewItem("logs", {
      description: `Error Failed to Update item from ${table}`,
      row_id: item?.id,
      table_name: table,
      admin_id: ADMIN?.id,
    });
  }
  // .single();
  return response;
};

export const removeSubscription = async (email) => {
  const response = await supabase
    .from("newsletter_subscription")
    .delete()
    .eq("email", email);

  return response;
};
