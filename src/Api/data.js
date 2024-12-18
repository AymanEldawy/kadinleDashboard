import {
  buildTree,
  getFormatPrice,
  getFormatPriceToInsert,
} from "../Helpers/functions";
import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";

let CURRENT_SEARCH_DATA = [];

export const normalFetch = async (table) => {
  const response = await supabase.from(table).select();
  return response;
};

export const normalFetchWithPagination = async (
  table,
  page,
  pageSize,
  additionalData
) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from(table).select();

  if (additionalData?.search?.value) query.eq(searchKey, searchValue);

  const response = await query.range(start, end);
  return response;
};

export const contentFilterFetch = async (table, additionalData) => {
  if (table === "size_content") {
    const response = await supabase
      .from(table)
      .select()
      .eq("region_id", additionalData?.regionId);
    return response;
  } else {
    const response = supabase
      .from(table)
      .select()
      .eq("language_id", additionalData?.languageId);
    if (additionalData?.sort) {
      response.order("title");
    }
    return await response;
  }
};

export const getChats = async () => {
  const response = await supabase
    .from(`chat`)
    .select(`*, user(id, first_name, last_name, profile_img)`)
    .order("created_at", { ascending: true });
  let hash = {};
  for (const row of response?.data) {
    hash[row?.room_id] = row;
  }
  return { data: Object.values(hash) };
};

export const getRooms = async () => {
  const response = await supabase
    .from(`room`)
    .select(`*, user(id, first_name, last_name, profile_img)`)
    .order("last_updated", { ascending: true });
  let hash = {};
  for (const row of response?.data) {
    hash[row?.user_id] = row;
  }
  return { data: Object.values(hash) };
};

export const getSingleSupplier = async (id) => {
  const response = await supabase
    .from(`supplier_request`)
    .select(`*, user(id, first_name, last_name, profile_img)`)
    .eq("id", id);

  return response?.data?.at(0);
};
// export const getSuppliers = async () => {
//   const response = await supabase
//     .from(`supplier_request`)
//     .select(`*, user(id, first_name, last_name, profile_img)`)
//     .order("created_at", { ascending: false });

//   return response;
// };

export const globalGetData = async ({
  page,
  pageSize,
  additionalData,
  filterFn,
  ignoredFilterColumns,
  query,
}) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  if (
    page > 1 &&
    CURRENT_SEARCH_DATA?.searchValue === searchValue &&
    CURRENT_SEARCH_DATA?.searchKey === searchKey
  ) {
    return {
      data: CURRENT_SEARCH_DATA?.data?.slice(start, end),
      count: CURRENT_SEARCH_DATA?.data?.length,
    };
  }

  if (!ignoredFilterColumns?.includes(searchKey)) {
    query.range(start, end);
  }

  const response = await query;

  if (ignoredFilterColumns?.includes(searchKey)) {
    let filterData = !!filterFn
      ? response?.data?.filter(filterFn)
      : response?.data;
    CURRENT_SEARCH_DATA = {
      searchKey,
      searchValue,
      data: filterData,
    };
    return {
      data: filterData?.slice(start, end),
      count: filterData?.length,
    };
  }
  return response;
};

export const getLogs = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("logs").select(
    `
    *,
     user(first_name, last_name, profile_img)
     `,
    { count: "exact" }
  );
  if (searchValue) {
    switch (searchKey) {
      case "user":
        query.ilike("user.first_name", `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }
  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["user"],
    filterFn: (f) =>
      f?.user?.first_name === searchValue ||
      f?.user?.first_name + " " + f?.user?.last_name === searchValue,
  });
};

export const getSales = async (language_id, type, page, pageSize) => {
  const query = supabase
    .from("offer")
    .select(
      `*,category(id, category_content(id, title, language_id)), offer_tier(*)`,
      {
        count: "exact",
      }
    )
    .eq("offer_type", "FLASH")
    .eq("category.category_content.language_id", language_id);

  if (type === 1) {
    query.gt("end_date", new Date().toISOString());
    query.lt("start_date", new Date().toISOString());
  } else if (type === 2) {
    query.lt("end_date", new Date().toISOString());
  } else {
    query.gt("start_date", new Date().toISOString());
  }

  return globalGetData({
    page,
    pageSize,
    query,
  });
};

export const getCategories = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("category")
    .select(
      `
    *,
    parent_id(id, category_content(id, title, language_id)),
    category_content(*,
      language(id, name )
      )
     `,
      { count: "exact" }
    )
    .eq("category_content.language_id", additionalData?.languageId)
    .eq("parent_id.category_content.language_id", additionalData?.languageId);

  if (searchValue) {
    switch (searchKey) {
      case "title":
        query.ilike("category_content.title", `%${searchValue}%`);
        break;
      case "description":
        query.ilike("category_content.description", `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  if (additionalData?.filter) {
    query.eq("parent_id", additionalData?.filter);
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["title", "description"],
    filterFn: (f) => f?.category_content?.length,
  });
};

export const getOrders = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("order")
    .select(
      `
      *,
      user(first_name, last_name, profile_img),
      address(country(name), name:city),
      warehouse_from(name),
      coupon(name:code),
      order_content(quantity, product_variant(id, variant_sku,price, barcode, discount, product(product_sku, product_content(name), product_image(image)))),
      order_status(numerical, status_content:order_status_content(order_status:status, language_id))
   `,
      { count: "exact" }
    )
    .eq(
      "order_content.product_variant.product.product_content.language_id",
      additionalData?.languageId
    )
    .eq("order_status.status_content.language_id", additionalData?.languageId)
    .range(start, end);

  if (searchValue) {
    switch (searchKey) {
      case "user":
        query.ilike("user.first_name", `%${searchValue}%`);
        break;
      case "address":
        query.ilike("address.country.name", `%${searchValue}%`);
        break;
      case "coupon":
      case "warehouse_from":
        query.ilike(`${searchKey}.name`, `%${searchValue}%`);
        break;
      case "variant":
        query.ilike(
          `order_content.product_variant.variant_sku`,
          `%${searchValue}%`
        );
        break;
      case "quantity":
        query.ilike(`category_content.quantity`, `%${searchValue}%`);
        break;
      case "order_status":
        query.ilike(
          `order_status.order_status_content.status`,
          `%${searchValue}%`
        );
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: [
      "user",
      "address",
      "coupon",
      "warehouse_from",
      "variant",
      "quantity",
      "order_status",
    ],
    filterFn: (f) => {
      return (
        f?.coupon.name === searchValue ||
        f?.warehouse_from.name === searchValue ||
        f?.category_content.quantity === searchValue ||
        f?.order_content.product_variant.sku === searchValue ||
        f?.order_status.order_status_content.status === searchValue
      );
    },
  });
};

export const getReturnStatus = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("return_status")
    .select(
      `
      *,
      return_status_content(*,language(id,name))
   `,
      { count: "exact" }
    )
    .eq("return_status_content.language_id", additionalData?.languageId)
    .range(start, end);

  if (searchValue) {
    switch (searchKey) {
      case "status":
        query.ilike(`return_status_content.status`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["status"],
    filterFn: (f) => f?.return_status_content?.status === searchValue,
  });
};

export const getOrderStatus = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("order_status")
    .select(
      `
      *,
      order_status_content(*,language(id,name))
      
   `,
      { count: "exact" }
    )
    .eq("order_status_content.language_id", additionalData?.languageId);

  if (searchValue) {
    switch (searchKey) {
      case "status":
        query.ilike(`order_status_content.status`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["status"],
    filterFn: (f) => f?.order_status_content.status === searchValue,
  });
};

export const getReturnRequests = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("order_return_request")
    .select(
      `
      *,
      return_status(return_status_content(*, name:status)),
      product_variant(id, variant_sku,product_id, product(product_content(product_id, name, language_id))),
      order(*, name:order_number)),
      return_reason(*,return_reason_content(*))
   `,
      { count: "exact" }
    )
    // .eq(
    //   "return_reason.return_status_content.name",
    //   additionalData?.languageId
    // )
    .eq(
      "product_variant.product.product_content.language_id",
      additionalData?.languageId
    );
  if (searchValue) {
    switch (searchKey) {
      case "name":
        query.ilike(`return_status.name`, `%${searchValue}%`);
        break;
      case "order":
        query.eq(`order.order_number`, `%${searchValue}%`);
        break;
      case "variant":
        query.ilike(`product_variant.sku`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["order", "variant", "name"],
    filterFn: (f) => {
      return (
        f?.return_status.name === searchValue ||
        f?.order.order_number === searchValue ||
        f?.product_variant.sku === searchValue
      );
    },
  });
};
export const getShippingPrices = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("shipping_price").select("*", { count: "exact" });
  if (searchValue) {
    switch (searchKey) {
      case "fast_price":
      case "normal_price":
        query.match({ [searchKey]: searchValue });
        break;
      case "weight":
        query.match({ normal_price: searchValue });
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["order", "variant", "name"],
    filterFn: (f) => {
      return (
        f?.return_status.name === searchValue ||
        f?.order.order_number === searchValue ||
        f?.product_variant.sku === searchValue
      );
    },
  });
};

export const getCollectionsProducts = async (
  page,
  pageSize,
  additionalData
) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("product")
    .select(
      `
      *,
      category(category_content(*, name:title, language_id, language(id, name))),
      brand(name),
      product_content(*,language_id, language(id, name)))
      
   `,
      { count: "exact" }
    )
    .eq("category.category_content.language_id", additionalData?.languageId)
    .eq("product_content.language_id", additionalData?.languageId);

  if (additionalData?.filter) {
    query.eq("category_id", additionalData?.filter);
  }

  if (searchValue) {
    switch (searchKey) {
      case "name":
        query.ilike("product_content.name::text", `%${searchValue}%`);
        break;
      case "description":
        query.ilike("product_content.description", `%${searchValue}%`);
        break;
      case "category":
        query.ilike("category.category_content.title", `%${searchValue}%`);
        break;
      case "brand":
        query.eq("brand.name", searchValue);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["category", "name", "description", "brand"],
    filterFn: (product) =>
      product?.product_content?.length &&
      product?.category?.category_content?.length,
  });
};

export const getProducts = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("product")
    .select(
      `
      *,
      category(category_content(*, name:title, language_id, language(id, name))),
      brand(name),
      product_image(image),
      product_content(*,language_id, language(id, name))),
      
   `,
      { count: "exact" }
    )
    .eq("category.category_content.language_id", additionalData?.languageId)
    .eq("product_content.language_id", additionalData?.languageId);
  if (additionalData?.product_ids) {
    query.in("id", additionalData?.product_ids);
  }
  if (additionalData?.filter) {
    const categories = await getCategoryChildrenIDS(additionalData?.filter);
    query.in("category_id", [...categories, additionalData?.filter]);
  }

  if (additionalData?.supplierId) {
    query.eq("seller_file_id", additionalData?.supplierId);
  }

  if (searchValue) {
    switch (searchKey) {
      case "name":
        query.ilike("product_content.name::text", `%${searchValue}%`);
        break;
      // case "sku":
      //   query.ilike("product.sku", `%${searchValue}%`);
      //   break;
      case "description":
        query.ilike("product_content.description", `%${searchValue}%`);
        break;
      case "category":
        query.ilike("category.category_content.title", `%${searchValue}%`);
        break;
      case "brand":
        query.eq("brand.name", searchValue);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["category", "name", "description", "brand"],
    filterFn: (product) =>
      product?.product_content?.length &&
      product?.category?.category_content?.length,
  });
};

export const getCountries = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("country").select(
    `
      *,
      currency (id, currency:name,code, rate, exchange_percent),
      region (id, name)
   `,
    { count: "exact" }
  );

  if (searchValue) {
    switch (searchKey) {
      case "rate":
      case "code":
      case "currency":
      case "exchange_percent":
        query.ilike(`currency.${searchKey}`, `%${searchValue}%`);
        break;
      case "region":
        query.ilike("region.name", `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: [
      "region",
      "rate",
      "code",
      "currency",
      "exchange_percent",
    ],
    filterFn: (f) =>
      f?.currency?.name === searchValue ||
      f?.currency?.currency === searchValue ||
      f?.currency?.code === searchValue ||
      f?.currency?.currency === searchValue ||
      f?.currency?.exchange_percent === searchValue ||
      f?.region?.name === searchValue,
  });
};

export const getOffers = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
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
    .eq("offer_content.language_id", additionalData?.languageId);

  if (searchValue) {
    switch (searchKey) {
      case "name":
      case "description":
        query.ilike(`offer_content.${searchKey}`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["name", "description"],
    filterFn: (f) =>
      f?.offer_content?.name === searchValue ||
      f?.offer_content?.description === searchValue,
  });
};

export const getCollections = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
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
    .eq("collection_content.language_id", additionalData?.languageId);

  if (searchValue) {
    switch (searchKey) {
      case "name":
        query.ilike(`collection_content.name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["name"],
    filterFn: (f) => f?.collection_content?.name === searchValue,
  });
};

export const getComments = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("comment")
    .select(
      `
    *,
    comment_media(*),
    user(id, first_name, last_name, profile_img),
    product(id, product_content(id, name))
     `,
      { count: "exact" }
    )
    .eq("product.product_content.language_id", additionalData?.languageId);

  if (searchValue) {
    switch (searchKey) {
      case "product":
        query.ilike(`product.product_content.name`, `%${searchValue}%`);
        break;
      case "user":
        query.ilike(`user.first_name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["user", "product"],
    filterFn: (f) =>
      f?.product?.product_content?.name === searchValue ||
      f?.user?.first_name === searchValue,
  });
};

export const getColors = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("color")
    .select(
      `
    *,
     color_content(*,
      language (id, name )
      )
      parent_id(id, color_content:parent(id, name, language_id))
     `,
      { count: "exact" }
    )
    .eq("color_content.language_id", additionalData?.languageId);
  // .eq("parent_id.color_content.language_id", additionalData?.languageId);

  if (searchValue) {
    switch (searchKey) {
      case "name":
        query.ilike(`color_content.name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["name"],
    filterFn: (f) => f?.color_content?.name === searchValue,
  });
};

export const getSizes = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("size")
    .select(
      `
    *,
      category (category_content(id, title)),
      size_content(id, size_id, name, region(id, name))
      `,
      { count: "exact" }
    )
    .eq("category.category_content.language_id", additionalData?.languageId);

  if (additionalData?.filter) {
    query.eq("category_id", additionalData?.filter);
  }

  if (searchValue) {
    switch (searchKey) {
      case "category":
        query.ilike(`category.category_content.name`, `%${searchValue}%`);
        break;
      case "name":
        query.ilike(`size_content.name`, `%${searchValue}%`);
        break;
      case "region":
        query.ilike(`size_content.region.name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["category", "name", "region"],
    filterFn: (f) =>
      f?.size_content?.name === searchValue ||
      f?.category?.category_content?.name === searchValue ||
      f?.size_content.region.name === searchValue,
  });
};

export const getHomeSliders = async (
  tableName,
  page,
  pageSize,
  additionalData
) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from(tableName)
    .select(
      `
    *,
    ${tableName}_content (*)
      `,
      { count: "exact" }
    )
    .eq(`${tableName}_content.language_id`, additionalData?.languageId);

  if (searchValue) {
    switch (searchKey) {
      case "sku":
        query.ilike(`${tableName}.sku`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
  });
};

export const getChartContent = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("chart_content").select(
    `
    *,
    chart(id, number),
    language_id,
    language(id, name)
     `,
    { count: "exact" }
  );

  if (searchValue) {
    switch (searchKey) {
      case "number":
        query.eq(`chart.number`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["number"],
    filterFn: (f) => f?.chart?.number === searchValue,
  });
};

export const getChartData = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("chart_data")
    .select(
      `
    *,
    chart(chart_content(id, name, language_id)),
    size (id, size_content (size_id, name, region_id )),
    chart_group(*)
     `,
      { count: "exact" }
    )
    .eq("size.size_content.region_id", additionalData?.regionId)
    .eq("chart.chart_content.language_id", additionalData?.languageId);

  if (searchValue) {
    switch (searchKey) {
      case "chart":
        query.ilike(`chart.chart_content.name`, `%${searchValue}%`);
        break;
      case "size":
        query.ilike(`size.size_content.name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["chart", "size"],
    filterFn: (f) => {
      return (
        f?.chart?.chart_content?.name === searchValue ||
        f?.size?.size_content?.name === searchValue
      );
    },
  });
};

export const getAddresses = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("address").select(
    `
    *,
    country ( id, name )
  `,
    { count: "exact" }
  );

  if (searchValue) {
    switch (searchKey) {
      case "country":
        query.ilike(`country.name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["country"],
    filterFn: (f) => f?.country?.name === searchValue,
  });
};

export const getSupplierAttachment = async (id) => {
  return await supabase
    .from(`supplier_attachment`)
    .select("*")
    .eq("seller_file_id", id);
};

export const getSuppliers = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from(`supplier`).select(`*, user(*)`, {
    count: "exact",
  });

  if (searchValue) {
    switch (searchKey) {
      case "user":
        query.ilike(`user.first_name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["user"],
    filterFn: (f) => f?.user?.first_name === searchValue,
  });
};

export const getSuppliersRequests = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from(`supplier_request`).select(`*, user(*)`, {
    count: "exact",
  });

  if (searchValue) {
    switch (searchKey) {
      case "user":
        query.ilike(`user.first_name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["user"],
    filterFn: (f) => f?.user?.first_name === searchValue,
  });
};

export const getPoints = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("point")
    .select(
      `
    *,
    point_content(*, language_id,language(name))
  `,
      { count: "exact" }
    )
    .eq("point_content.language_id", additionalData?.languageId);

  if (searchValue) {
    switch (searchKey) {
      case "cause":
        query.ilike(`point_content.cause`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["cause"],
    filterFn: (f) => f?.point_content?.cause === searchValue,
  });
};

export const getStocks = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("stock").select(
    `
    *,
    warehouse(name),
    product_variant(id, variant_sku)
  `,
    { count: "exact" }
  );

  if (searchValue) {
    switch (searchKey) {
      case "warehouse":
        query.ilike(`warehouse.name`, `%${searchValue}%`);
        break;
      case "variant":
        query.eq(`product_variant.variant_sku`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["variant", "warehouse"],
    filterFn: (f) =>
      f?.warehouse?.name === searchValue ||
      f?.product_variant?.sku === searchValue,
  });
};

export const getWarehouses = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("warehouse").select(
    `
    *,
    address(id,name:line_one)
  `,
    { count: "exact" }
  );

  if (searchValue) {
    switch (searchKey) {
      case "address":
        query.ilike(`address.list_one`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["address"],
    filterFn: (f) => f?.address?.list_one === searchValue,
  });
};

export const getWarehouseAvailability = async (
  page,
  pageSize,
  additionalData
) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("warehouse_availability").select(
    `
    *,
    warehouse(name),
    country(name)
  `,
    { count: "exact" }
  );

  if (searchValue) {
    switch (searchKey) {
      case "warehouse":
        query.ilike(`warehouse.name`, `%${searchValue}%`);
        break;
      case "country":
        query.ilike(`country.name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["country", "warehouse"],
    filterFn: (f) =>
      f?.warehouse?.name === searchValue || f?.country?.name === searchValue,
  });
};

export const getNews = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("news")
    .select(
      `
    *,
    news_content(*, language(name))
    `,
      { count: "exact" }
    )
    .eq("news_content.language_id", additionalData?.languageId);

  if (searchValue) {
    switch (searchKey) {
      case "content":
        query.ilike(`news_content.content`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["content"],
    filterFn: (f) => f?.news_content?.content === searchValue,
  });
};

export const getUsers = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("user").select(
    `
  *,
  title:user_type(*, name:title)
  `,
    { count: "exact" }
  );

  if (searchValue) {
    switch (searchKey) {
      case "title":
        query.ilike(`user_type.title`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["title"],
    filterFn: (f) => f?.title?.title === searchValue,
  });
};

export const getUsersCart = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("user_cart")
    .select(
      `
    *,
    product_variant(id, variant_sku,product_id, product(product_content(product_id, name, language_id)))
    `,
      { count: "exact" }
    )
    .eq(
      "product_variant.product.product_content.language_id",
      additionalData?.languageId
    )
    .eq("user_id", additionalData?.userId);

  if (searchValue) {
    switch (searchKey) {
      case "variant":
        query.ilike(`product_variant.sku`, `%${searchValue}%`);
        break;
      case "name":
        query.ilike(
          `product_variant.product.product_content.name`,
          `%${searchValue}%`
        );
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["variant", "name"],
    filterFn: (f) =>
      f?.product_variant?.sku === searchValue ||
      f?.product_variant?.product?.product_content?.name,
  });
};

export const getBills = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("bill").select(
    `
    *,
    user(first_name, last_name, profile_img),
    order_number:order(id, name:order_number)
    `,
    { count: "exact" }
  );

  if (searchValue) {
    switch (searchKey) {
      case "user":
        query.ilike(`user.first_name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["variant", "name"],
    filterFn: (f) =>
      f?.product_variant?.sku === searchValue ||
      f?.product_variant?.product?.product_content?.name,
  });
};
export const getOrderReports = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("order_report").select(
    `
    *,
    user(first_name, last_name, profile_img),
    order_number:order(id, name:order_number)
    `,
    { count: "exact" }
  );

  if (searchValue) {
    switch (searchKey) {
      case "user":
        query.ilike(`user.first_name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["variant", "name"],
    filterFn: (f) =>
      f?.product_variant?.sku === searchValue ||
      f?.product_variant?.product?.product_content?.name,
  });
};
export const getBillReports = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase.from("bill_report").select(
    `
    *,
    user(first_name, last_name, profile_img)
    `,
    { count: "exact" }
  );

  if (searchValue) {
    switch (searchKey) {
      case "user":
        query.ilike(`user.first_name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["variant", "name"],
    filterFn: (f) =>
      f?.product_variant?.sku === searchValue ||
      f?.product_variant?.product?.product_content?.name,
  });
};

export const getUserAddresses = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("user_address")
    .select(
      `
    *,
    address(*, name:line_one)
    `
    )
    .eq("user_id", additionalData?.userId);

  if (searchValue) {
    switch (searchKey) {
      case "address":
        query.ilike(`address.line_one`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["address"],
    filterFn: (f) => f?.address?.name === searchValue,
  });
};

export const getUserLikes = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from("user_like")
    .select(
      `
    *,
    product(product_content(id, name))
    `
    )
    .eq("user_id", additionalData?.userId);

  if (searchValue) {
    switch (searchKey) {
      case "product":
        query.ilike(`product.product_content.name`, `%${searchValue}%`);
        break;
      default:
        query.eq(searchKey, searchValue);
    }
  }

  return globalGetData({
    page,
    pageSize,
    additionalData,
    query,
    ignoredFilterColumns: ["name"],
    filterFn: (f) => f?.product?.product_content?.name === searchValue,
  });
};

export const getUserSubTable = async (
  table,
  page,
  pageSize,
  additionalData
) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;

  try {
    const response = await supabase
      .from(table)
      .select("*")
      .eq("user_id", additionalData?.userId)
      .range(start, end);
    return response;
  } catch (error) {}
};

export const getUserPoints = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;

  try {
    const response = await supabase
      .from("user_point")
      .select(
        `
    *,
    point:point(point_content(*, name:cause))
    `
      )
      .eq("user_id", additionalData?.userId)
      .eq("point.point_content.language_id", additionalData?.languageId)
      .range(start, end);
    return response;
  } catch (error) {}
};

export const getUserData = async (table, col, userId) => {
  const response = await supabase.from(table).select("*").eq(col, userId);
  return response;
};

export const getUserTypeData = async (userTypeId) => {
  const response = await supabase
    .from("user_type")
    .select("*")
    .eq("id", userTypeId);
  return response;
};

export const getUserDataFromReport = async () => {};

export const getUsersEmail = async () => {
  const response = await supabase.from("user").select(" email");
  return response;
};

export const getAllCategories = async (languageId) => {
  const response = await supabase
    .from("category_content")
    .select(`*, label:title, value:id`)
    .eq("language_id", languageId);
  // .limit(20);
  return response?.data;
};
export const getHomeSections = async (languageId) => {
  const response = await supabase
    .from("home_sections")
    .select(
      "id,deletable,display_home,section_id,section_name,section_order,section_type"
    );
  return response?.data;
};

export const updateCategoryStatus = async (cateId) => {
  const response = await supabase
    .from("category")
    .update({ display_homepage: true })
    .eq("id", cateId);
  return response;
};

export const updateUserType = async (userId) => {
  const userType = await supabase.from("user_type").select("*").eq("number", 6);
  if (userType?.error) return;
  await supabase
    .from("user")
    .update({
      user_type_id: userType?.data?.at(0)?.id,
    })
    .eq("id", userId);
};

export const getOnlyParentCategory = async (languageId) => {
  return await supabase
    .from("category")
    .select(`*, category_content(id, language_id, title)`)
    .is("parent_id", null)
    .eq("category_content.language_id", languageId);
};

export const getCategoryChildren = async (parent_id, languageId) => {
  return await supabase
    .from("category")
    .select(`*, category_content(id, language_id, title)`)
    .eq("parent_id", parent_id)
    .eq("category_content.language_id", languageId);
};

export const getCategoryChildrenIDS = async (parent_id) => {
  const res = await supabase
    .from("category")
    .select(`id`)
    .eq("parent_id", parent_id);

  return res?.data?.length ? res?.data?.map((c) => c?.id) : [];
};

// export const getSupplierProducts = async (supplierId, categoryId) => {
//   const res = await supabase
//     .from("category")
//     .select(`id`)
//     .eq("parent_id", parent_id)
//     .limit()

//   return res?.data?.length ? res?.data?.map((c) => c?.id) : [];
// };

export const getSupplierProducts = async (page, pageSize, additionalData) => {
  const query = supabase
    .from("product")
    .select(
      `
    seller_file_id, seller_sku, product_sku, id,
    category(category_content(name:title, language_id)),
    brand(name),
    product_content(name, language_id),
    product_variant(id),
    product_image(image)
    `,
      { count: "exact" }
    )
    .eq("product_content.language_id", additionalData?.languageId)
    .eq("category.category_content.language_id", additionalData?.languageId);

  if (additionalData?.filter) {
    const categories = await getCategoryChildrenIDS(additionalData?.filter);
    // query.in("category_id", [...categories, additionalData?.filter]);
    query.eq("category_id", additionalData?.filter);
  }

  if (additionalData?.supplierId) {
    query.eq("seller_file_id", additionalData?.supplierId);
  }

  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;

  return await query.range(start, end);
};

export const getCategoriesList = async (language_id, value) => {
  const response = await supabase
    .from("category_content")
    .select("title, category_id, language_id")
    .eq("language_id", language_id)
    .ilike("title", `%${value}%`);
  return response?.data;
};

export const getCategoriesBanner = async (languageId) => {
  return await supabase
    .from("categories_banner")
    .select(`*, category(id, image, category_content(title))`)
    .eq("category.category_content.language_id", languageId);
};

export const getSuppliersList = async () => {
  const { data, error } = await supabase
    .from("product")
    .select("id, seller_file_id");

  let hash = {};
  for (const supplier of data) {
    hash[supplier?.seller_file_id] = supplier;
  }

  return Object.values(hash);
};

export const getSupplierProductsReview = async (
  language_id,
  supplierId,
  page,
  pageSize
) => {
  let start = page * pageSize;
  let end = (page + 1) * pageSize;

  const response = await supabase
    .from("product")
    .select(`id, seller_file_id,seller_sku, content:product_content(name)`)
    // .select(`id, seller_file_id,seller_sku, content:product_content(name)`)
    .eq("product_content.language_id", language_id)
    .eq("seller_file_id", supplierId);
  // .range(start, end);
  return response;
};

export const getSupplierData = async () => {};

export const refreshPrices = async (item) => {
  const currency = await supabase.from("currency").select().eq("code", "TRY");
  const response = await supabase
    .from("product_variant")
    .select("*")
    .gte(
      "purchase_price",
      getFormatPriceToInsert(item?.min_price, currency?.data?.at(0))
    )
    .lte(
      "purchase_price",
      getFormatPriceToInsert(item?.max_price, currency?.data?.at(0))
    );

  const batchSize = 200;
  const variants = response?.data || [];

  for (let i = 0; i < variants.length; i += batchSize) {
    const batch = variants.slice(i, i + batchSize).map((variant) => {
      let additionalData = {};

      let global = {
        global_price: item?.global_percentage * variant?.purchase_price,
        global_percentage: item?.global_percentage,
      };

      let local = {
        percentage: item?.percentage,
        price: item?.percentage * variant?.purchase_price,
      };

      if (item?.is_global) {
        additionalData = global;
      } else if (item?.percentage && item?.global_percentage) {
        additionalData = {
          ...local,
          ...global,
        };
      } else {
        additionalData = local;
      }

      return {
        ...variant,
        ...additionalData,
      };
    });

    const { data, error } = await supabase
      .from("product_variant")
      .upsert(batch);

    if (error) {
    } else {
    }
  }
  return response;
};

export const refreshWeights = async (item) => {
  const products = await supabase
    .from("product")
    .select()
    .eq("category_id", item?.category_id);
  const ids = products?.data?.map((c) => c?.id);
  const variants = await supabase
    .from("product_variant")
    .select()
    .in("product_id", ids);

  const variantsData = [];

  for (const variant of variants?.data) {
    // if (variant?.weight) continue;

    variantsData.push({
      ...variant,
      weight: item?.gram / 1000,
    });
  }

  const batchSize = 500;

  let response = null;

  for (let i = 0; i < variantsData.length; i += batchSize) {
    const batch = variantsData.slice(i, i + batchSize);
    response = await supabase.from("product_variant").upsert(batch);
  }

  return {
    length: variantsData?.length,
    ...response,
  };
};

export const getCategoryTree = async () => {
  const categories = await supabase
    .from("category")
    .select(`*, category_content(*)`);

  return buildTree(categories?.data);
};

export const getProductEndingStock = async () => {
  const { data: products } = await supabase
    .from("product")
    .select(`*, product_variant(*, stock(*))`)
    .eq("product_variant.stock.stock", 0)
    // .gt("product_variant.stock.stock", 1)
    .is("display", true)
    .limit(100);
};

export const getTableDataWithContent = async (table, id) => {
  const query = supabase.from(table).select(`*, ${table}_content(*)`);

  if (id) query.eq("id", id);

  return await query;
};

export const getCacheCategory = async (language_id) => {
  const query = await supabase
    .from("category_content")
    .select(`category_id, language_id, title`)
    .eq("language_id", language_id);

  let hash = {};
  for (const cate of query?.data) {
    hash[cate?.category_id] = cate?.title;
  }

  return hash;
};

export const getCacheCategoryForMeasurement = async (id) => {
  const query = await supabase
    .from("measurement_categories_group")
    .select(`*`)
    .eq("id", id);

  let hash = {};
  for (const cate of query?.data?.categories_ids) {
    hash[cate] = cate;
  }

  return hash;
};

export const getCategorySearch = async (language_id, key, value) => {
  const query = supabase
    .from("category")
    .select(`numeric,id,category_content(language_id, title)`)
    .eq("category_content.language_id", language_id);

  if (key === 1) {
    query.eq("numeric", value);
  } else if (key === 2) {
    query.ilike(`category_content.title`, `%${value}%`);
  }
  return await query;
};

export const getSizesFilter = async (region_id, type) => {
  const query = await supabase
    .from("size")
    .select(`id,size_sku,size_content(region_id, name)`)
    // .eq("size_content.region_id", region_id)
    .eq("type", type);
  return query;
};

export const get_out_of_stock_products = async (
  param_lang_id,
  param_limit,
  param_offset
) => {
  return await supabase.rpc("get_out_of_stock_products", {
    param_lang_id,
    param_limit,
    param_offset,
  });
};

export const hidden_available_products = async (
  param_lang_id,
  param_limit,
  param_offset
) => {
  return await supabase.rpc("hidden_available_products", {
    param_lang_id,
    param_limit,
    param_offset,
  });
};

export const getHiddenProducts = async (
  param_lang_id,
  param_limit,
  param_offset
) => {
  return await supabase.rpc("get_hidden_products", {
    param_lang_id,
    param_limit,
    param_offset,
  });
};

export const get_seller_products = async (
  param_lang_id,
  param_seller_id,
  param_category_id,
  param_seller_sku,
  param_product_sku,
  param_limit,
  param_offset,
) => {
  return await supabase.rpc("get_seller_products", {
    param_lang_id,
    param_seller_id,
    param_category_id,
    param_seller_sku,
    param_product_sku,
    param_limit,
    param_offset,
  });
};

export const getProductsForCategory = async (
  languageId,
  categoryId,
  page = 0,
  pageSize = 50
) => {
  let start = page * pageSize;
  let end = (page + 1) * pageSize;

  const query = supabase
    .from("product")
    .select(
      `
    id, seller_sku, seller_file_id,product_sku,
    category(category_content(*, name:title)),
    brand(name),
    product_image(image),
    product_content(name)
 `,
      { count: "exact" }
    )
    .eq("category.category_content.language_id", languageId)
    .eq("product_content.language_id", languageId);

  if (categoryId) {
    const categories = await getCategoryChildrenIDS(categoryId);
    query.in("category_id", [...categories, categoryId]);
  }

  return await query.range(start, end);
};

export const getCategoriesTopLevel = async (language_id) => {
  const categories = await supabase
    .from("category")
    .select(`id, content:category_content(title)`)
    .is("parent_id", null)
    .eq("content.language_id", language_id);
  return categories?.data;
};

export const getProductsView = async (languageId, product_ids) => {
  const query = supabase
    .from("product")
    .select(
      `
      id, seller_sku, product_sku,
      category(category_content(*, name:title)),
      brand(name),
      product_image(image),
      product_content(name)
      
   `,
      { count: "exact" }
    )
    .eq("category.category_content.language_id", languageId)
    .eq("product_content.language_id", languageId)
    .in("id", product_ids);

  return await query;
};

export const getSaleData = async (id, language_id) =>
  await supabase
    .from("sale")
    .select(`*, category(id, category_content(title))`)
    .eq("id", id)
    .eq("category.category_content.language_id", language_id);

export const getOfferProducts = async (offer_id) =>
  await supabase.from("offer_product").select(`*`).eq("offer_id", offer_id);

export const getOfferCountry = async (offer_id) =>
  await supabase.from("offer_countries").select(`*`).eq("offer_id", offer_id);

export const getOfferCategory = async (offer_id) =>
  await supabase.from("offer_category").select(`*`).eq("offer_id", offer_id);

export const getOfferData = async (table, offer_id) =>
  await supabase.from(table).select(`*`).eq("offer_id", offer_id);

export const getProductsByCategoryId = async (category_id) =>
  await supabase
    .from("product")
    .select(`product_id:id`)
    .eq("category_id", category_id);

export const getAllProductsId = async () =>
  await supabase.from("product").select(`product_id:id`);

export const getColorsMap = async (value, languageId, region_id) =>
  await supabase
    .from("color")
    .select(`id,color_sku, color_content(name, color_id)`)
    .eq("color_sku", +value)
    .eq("color_content.language_id", languageId);

export const getSizesMap = async (value, languageId, region_id) =>
  await supabase
    .from("size")
    .select(`id,size_sku, size_content(name, size_id, region_id)`)
    .ilike("size_sku", `%${value}%`)
    .eq("size_content.region_id", region_id);

export const getCategoriesMap = async (value, languageId) =>
  await supabase
    .from("category")
    .select(`id,numeric, category_content(title, category_id)`)
    .ilike("numeric", `%${value}%`)
    .eq("category_content.language_id", languageId);

export const getProductsList = async ({
  param_lang_id,
  param_min_price,
  param_max_price,
  param_seller_sku,
  param_category_id,
  param_name,
  param_ignore_ids,
  param_products_ids,
  param_limit,
  param_offset,
}) => {
  let { data, error } = await supabase.rpc("get_products_list", {
    param_lang_id,
    param_min_price,
    param_max_price,
    param_seller_sku,
    param_category_id,
    param_name,
    param_ignore_ids,
    param_products_ids,
    param_limit,
    param_offset,
  });
  return data;
};

export const getGroup2ProductIds = async (offer_id) => {
  let query = supabase
    .from("offer")
    .select(`id, group, offer_product(product_id)`)
    .eq("group", 2);

  if (offer_id) query.neq("id", offer_id);

  const response = await query;
  const productIds = response?.data?.flatMap((c) =>
    c?.offer_product?.map((p) => p?.product_id)
  );

  return productIds;
};

export const getFirstVariant = async (productId) => {
  const { data, error } = await supabase
    .from("product_variant")
    .select("id")
    .eq("product_id", productId);

  return data?.at(0)?.id;
};

export const getProductInfo = async (productId, language_id, region_id) => {
  const { data, error } = await supabase
    .from("product_variant")
    .select(
      `
    id,
    product_id,
    color_details,
    discount,
    global_percentage,
    global_price,
    percentage,
    price,
    purchase_price,
    seller_sku,
    size(id, size_content(name)),
    color(id, color_content(name)),
    stock(stock)`
    )
    .eq("product_id", productId)
    .eq("color.color_content.language_id", language_id)
    .eq("size.size_content.region_id", region_id);

  const { data: images } = await supabase
    .from("product_image")
    .select("image")
    .eq("product_id", productId)
    .limit(1);

  return {
    variants: data,
    images,
    error,
  };
};

export const getOnlySaleProduct = async () => {
  let response = await supabase
    .from("offer")
    .select(`id, group, end_date, offer_product(product_id)`)
    .eq("offer_type", "FLASH")
    .gt("end_date", new Date().toISOString())
    .lt("start_date", new Date().toISOString());

  const CACHE_DATE = {};

  const productIds = response?.data?.flatMap((c) =>
    c?.offer_product?.map((p) => {
      CACHE_DATE[p?.product_id] = c?.end_date;
      return p?.product_id;
    })
  );

  return {
    productIds,
    CACHE_DATE,
  };
};

export const getCurrency = async () => {
  return await supabase.from("currency").select("*");
};
