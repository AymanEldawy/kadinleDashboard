import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";

const LANGUAGE = {
  name: "",
  id: "c53d7987-f51a-4b47-9ee0-3215becdce17",
};
const REGION = {
  name: "EN",
  id: "83f4acbc-d93b-4b3d-9c78-11d1b353517a",
};

function fetchFromStorage(key, initialValue) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    return initialValue;
  }
}

export const DEFAULT_LANGUAGE = fetchFromStorage(
  "KADINLE_DEFAULT_LANGUAGE",
  LANGUAGE
);
export const DEFAULT_REGION = fetchFromStorage(
  "KADINLE_DEFAULT_REGION",
  REGION
);

export const normalFetch = async (table) => {
  const response = await supabase.from(table).select();
  return response;
};
export const normalFetchWithPagination = async (table, page, pageSize) => {
  const response = await supabase
    .from(table)
    .select()
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};
export const contentFilterFetch = async (table) => {
  if (table === "size_content") {
    const response = await supabase
      .from(table)
      .select()
      .eq("region_id", DEFAULT_REGION?.id);
    return response;
  } else {
    const response = await supabase
      .from(table)
      .select()
      .eq("language_id", DEFAULT_LANGUAGE?.id);
    return response;
  }
};

export const getCategories = async (page, pageSize) => {
  const response = await supabase
    .from("category")
    .select(
      `
    *,
     category_content(*,
      language(id, name )
      )
    
     `,
      { count: "exact" }
    )
    .eq("category_content.language_id", DEFAULT_LANGUAGE?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};

export const getOrders = async (page, pageSize) => {
  const response = await supabase
    .from("order")
    .select(
      `
      *,
      user(first_name, last_name, profile_img),
      address(country(name), name:city),
      warehouse_from(name),
      coupon(name:code),
      order_content(quantity, product_variant(id, sku)),
      order_status(numerical, status_content:order_status_content(order_status:status, language_id))
   `,
      { count: "exact" }
    )
    .eq("order_status.status_content.language_id", DEFAULT_LANGUAGE?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};
export const getReturnStatus = async (page, pageSize) => {
  const response = await supabase
    .from("return_status")
    .select(
      `
      *,
      return_status_content(*,language(id,name))
   `,
      { count: "exact" }
    )
    .eq("return_status_content.language_id", DEFAULT_LANGUAGE?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};
export const getOrderStatus = async (page, pageSize) => {
  const response = await supabase
    .from("order_status")
    .select(
      `
      *,
      order_status_content(*,language(id,name))
      
   `,
      { count: "exact" }
    )
    .eq("order_status_content.language_id", DEFAULT_LANGUAGE?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};
export const getReturnRequests = async (page, pageSize) => {
  const response = await supabase
    .from("order_return_request")
    .select(
      `
      *,
      return_status(*, name:numerical),
      product_variant(id, sku, product(product_content(product_id, name, language_id))),
      order(*, name:order_number))
   `,
      { count: "exact" }
    )
    .eq(
      "product_variant.product.product_content.language_id",
      DEFAULT_LANGUAGE?.id
    )
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};
export const getProducts = async (page, pageSize) => {
  const response = await supabase
    .from("product")
    .select(
      `
      *,
      category(category_content(*, name:title, language_id, language(id, name))),
      brand(name),
      fabric(fabric_content(*,language_id, language(id, name))),
      material(material_content(*,language_id, language(id, name))),
      lining(lining_content(*,language_id, language(id, name))),
      collar(collar_content(*,language_id, language(id, name))),
      sleeve(sleeve_content(*,language_id, language(id, name))),
      season(season_content(*,language_id, language(id, name))),
      feature(feature_content(*,language_id, language(id, name))),
      pattern(pattern_content(*,language_id, language(id, name))),
      product_content(*,language_id, language(id, name))),
      
   `,
      { count: "exact" }
    )
    .eq("fabric.fabric_content.language_id", DEFAULT_LANGUAGE?.id)
    .eq("material.material_content.language_id", DEFAULT_LANGUAGE?.id)
    .eq("lining.lining_content.language_id", DEFAULT_LANGUAGE?.id)
    .eq("collar.collar_content.language_id", DEFAULT_LANGUAGE?.id)
    .eq("sleeve.sleeve_content.language_id", DEFAULT_LANGUAGE?.id)
    .eq("season.season_content.language_id", DEFAULT_LANGUAGE?.id)
    .eq("feature.feature_content.language_id", DEFAULT_LANGUAGE?.id)
    .eq("pattern.pattern_content.language_id", DEFAULT_LANGUAGE?.id)
    .eq("product_content.language_id", DEFAULT_LANGUAGE?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};
export const getProductFeatures = async (table, page, pageSize) => {
  const response = await supabase
    .from(table)
    .select(
      `
      *,
      language_id,
      language(id, name)
   `,
      { count: "exact" }
    )
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};

export const getCountries = async (page, pageSize) => {
  const response = await supabase
    .from("country")
    .select(
      `
      *,
      currency (id, currency:name,code, rate, exchange_percent),
      region (id, name)
   `,
      { count: "exact" }
    )
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};

export const getOffers = async (page, pageSize) => {
  const response = await supabase
    .from("offer")
    .select(
      `
    *,
    offer_content(id, name, description, media,language_id,
      language(id, name)
      )
     `,
      { count: "exact" }
    )
    .eq("offer_content.language_id", DEFAULT_LANGUAGE?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};
export const getCollections = async (page, pageSize) => {
  const response = await supabase
    .from("collection")
    .select(
      `
    *,
    collection_content(id, name,image, language_id,
      language (id, name )
      )
     `,
      { count: "exact" }
    )
    .eq("collection_content.language_id", DEFAULT_LANGUAGE?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};
export const getComments = async (page, pageSize) => {
  const response = await supabase
    .from("comment")
    .select(
      `
    *,
    comment_media(*),
    user(id, first_name, last_name, profile_img),
    product(id, product_content(*))
     `,
      { count: "exact" }
    )
    .eq("product.product_content.language_id", DEFAULT_LANGUAGE?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};

export const getColors = async (page, pageSize) => {
  const response = await supabase
    .from("color")
    .select(
      `
    *,
     color_content(*,
      language (id, name )
      )
     `,
      { count: "exact" }
    )
    .eq("color_content.language_id", DEFAULT_LANGUAGE?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);

  return response;
};
export const getSizes = async (page, pageSize) => {
  const response = await supabase
    .from("size")
    .select(
      `
    *,
      category (category_content(*)),
      size_content(id, size_id, name, region(id, name))
      `,
      { count: "exact" }
    )
    .eq("category.category_content.language_id", DEFAULT_LANGUAGE?.id)
    .eq("size_content.region_id", DEFAULT_REGION?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);

  return response;
};
export const getChartContent = async (page, pageSize) => {
  const response = await supabase
    .from("chart_content")
    .select(
      `
    *,
    chart(id, number),
    language_id,
    language(id, name)
     `,
      { count: "exact" }
    )
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};
export const getChartData = async (page, pageSize) => {
  const response = await supabase
    .from("chart_data")
    .select(
      `
    *,
    chart(chart_content(id, name, language_id)),
    product (id, product_content (name, language_id )),
    size (id, size_content (size_id, name, region_id ))
    
     `,
      { count: "exact" }
    )
    .eq("size.size_content.region_id", DEFAULT_REGION?.id)
    .eq("chart.chart_content.language_id", DEFAULT_LANGUAGE?.id)
    .eq("product.product_content.language_id", DEFAULT_LANGUAGE?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);
  return response;
};

export const getAddresses = async (page, pageSize) => {
  const response = await supabase
    .from("address")
    .select(
      `
    *,
    country ( id, name )
  `,
      { count: "exact" }
    )
    .range((page - 1) * pageSize, page * pageSize - 1);

  return response;
};

export const getPoints = async (page, pageSize) => {
  const response = await supabase
    .from("point")
    .select(
      `
    *,
    point_content(*, language_id,language(name))
  `,
      { count: "exact" }
    )
    .eq("point_content.language_id", DEFAULT_LANGUAGE?.id)
    .range((page - 1) * pageSize, page * pageSize - 1);

  return response;
};
export const getStocks = async (page, pageSize) => {
  const response = await supabase
    .from("stock")
    .select(
      `
    *,
    warehouse(name),
    product_variant(id, sku, product(product_content(product_id, name, language_id)))
  `,
      { count: "exact" }
    )
    .eq(
      "product_variant.product.product_content.language_id",
      DEFAULT_LANGUAGE?.id
    )
    .range((page - 1) * pageSize, page * pageSize - 1);

  return response;
};
export const getWarehouses = async (page, pageSize) => {
  const response = await supabase
    .from("warehouse")
    .select(
      `
    *,
    address(id,name:line_one)
  `,
      { count: "exact" }
    )
    .range((page - 1) * pageSize, page * pageSize - 1);

  return response;
};
export const getWarehouseAvailability = async (page, pageSize) => {
  const response = await supabase
    .from("warehouse_availability")
    .select(
      `
    *,
    warehouse(name),
    country(name)
  `,
      { count: "exact" }
    )
    .range((page - 1) * pageSize, page * pageSize - 1);

  return response;
};
// export const getShowreels = async () => {
//   const response = await supabase.from("showreel").select(
//     `
//     *,
//     user(*),
//     product(id,product_content(*))
//   `
//   );
//   // .eq("product.product_content.language_id", DEFAULT_LANGUAGE?.id);

//   return response;
// };
// user
export const getUserAddresses = async () => {
  const response = await supabase.from("user_address").select(`
    *,
    address(*, name:line_one)
    `);

  // users(*)
  // user(first_name, last_name, profile_img),
  return response;
};
export const getNews = async () => {
  const response = await supabase
    .from("news")
    .select(
      `
    *,
    news_content(*)
    `,
      { count: "exact" }
    )
    .eq("news_content.language_id", DEFAULT_LANGUAGE?.id);

  // users(*)
  // user(first_name, last_name, profile_img),
  return response;
};
export const getUsersCart = async () => {
  const response = await supabase
    .from("user_cart")
    .select(
      `
    *,
    product_variant(id, sku, product(product_content(product_id, name, language_id)))
    `,
      { count: "exact" }
    )
    .eq(
      "product_variant.product.product_content.language_id",
      DEFAULT_LANGUAGE?.id
    );

  return response;
  // user(first_name, last_name, profile_img),
};
export const getUserSubTable = async (table) => {
  // const response = await supabase.from(table).select(`
  //   *,
  //   user(*)
  //   `);
  try {
    const response = await supabase.from(table).select("*");

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDataById = async (userId) => {
  const response = await supabase.from("user").select("*").eq("id", userId);
  return response;
};
export const getUserData = async (table, userId) => {
  const response = await supabase.from(table).select("*").eq("user_id", userId);
  return response;
};
