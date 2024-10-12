import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";

export const getRecentUser = async (limit = 10) => {
  const res = await supabase
    .from("user")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return res;
};
export const getRecentOrders = async (limit = 10) => {
  const res = await supabase
    .from("order")
    .select(
      `
      *,
      user(id, email, first_name, last_name, profile_img),
      order_content(*, product_variant(*)),
      order_status(*, order_status_content(*))
    `
    )
    .order("created_at", { ascending: false })
    .limit(limit);
  return res;
};

export const getOrderData = async (
  param_lang_id, // required
  param_order_id, // optional
  param_limit = 50,
  param_offset = 0
) => {
  const response = await supabase.rpc("get_orders", {
    param_lang_id,
    param_order_id,
    param_limit,
    param_offset,
  });

  return response;
};

export const bestSelling = async () => {
  const { data, error } = await supabase
    .from("order_content")
    .select("*, variant:variant_id(product(*,product_content(*)))")
    .order("variant_id", { ascending: false })
    .limit(10);

  return data;
};

export const getTotalEarning = async () => {
  const { data, error } = await supabase.from("order").select("price");
  const total = data?.reduce((result, cur) => {
    return result + cur?.price;
  }, 0);
  return { total };
};

export const getCount = async (table) => {
  const { data, error } = await supabase.from(table).select("id");
  return { [`${table}_count`]: data?.length };
};

// export const getOrdersCount = getCount("order");
// export const getUserCount = getCount("user");
