import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";

let CURRENT_SEARCH_DATA = []

export const normalFetch = async (table) => {
  const response = await supabase.from(table).select();
  return response;
};

export const normalFetchWithPagination = async (table, page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
    .from(table)
    .select()

  if (additionalData?.search?.value)
    query.eq(searchKey, searchValue)

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
    const response = await supabase
      .from(table)
      .select()
      .eq("language_id", additionalData?.languageId);
    return response;
  }
};

export const globalGetData = async ({
  page,
  pageSize,
  additionalData,
  filterFn,
  ignoredFilterColumns,
  query

}) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;
  if (page > 1 && CURRENT_SEARCH_DATA?.searchValue === searchValue && CURRENT_SEARCH_DATA?.searchKey === searchKey) {
    console.log('called');
    return {
      data: CURRENT_SEARCH_DATA?.data?.slice(start, end),
      count: CURRENT_SEARCH_DATA?.data?.length
    }
  }

  if (!ignoredFilterColumns?.includes(searchKey)) {
    query.range(start, end)
  }

  const response = await query;

  if (ignoredFilterColumns?.includes(searchKey)) {
    let filterData = response?.data?.filter(filterFn)
    CURRENT_SEARCH_DATA = {
      searchKey,
      searchValue,
      data: filterData
    }
    return {
      data: filterData?.slice(start, end),
      count: filterData?.length
    }
  }
  return response;
};



export const getCategories = async (page, pageSize, additionalData) => {
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
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
    .eq("category_content.language_id", additionalData?.languageId)


  if (searchValue) {
    switch (searchKey) {
      case 'title':
        query.ilike('category_content.title', searchValue);
        break;
      case 'description':
        query.ilike('category_content.description', searchValue);
        break;
      default:
        query.eq(searchKey, searchValue)
    }
  }
  return globalGetData({
    page, pageSize, additionalData, query, ignoredFilterColumns: ['title', 'description'],
    filterFn: (f) => f?.category_content?.length
  })

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
      order_content(quantity, product_variant(id, sku)),
      order_status(numerical, status_content:order_status_content(order_status:status, language_id))
   `,
      { count: "exact" }
    )
    .eq("order_status.status_content.language_id", additionalData?.languageId)
    .range(start, end);

  if (searchValue) {
    switch (searchKey) {
      case 'user':
        query.ilike('user.first_name', searchValue);
        break;
      case 'address':
        query.ilike('address.country.name', searchValue);
        break;
      case 'coupon':
      case 'warehouse_from':
        query.ilike(`${searchKey}.name`, searchValue);
        break;
      case 'variant':
        query.ilike(`order_content.product_variant.sku`, searchValue);
        break;
      case 'quantity':
        query.ilike(`category_content.quantity`, searchValue);
        break;
      case 'order_status':
        query.ilike(`order_status.order_status_content.status`, searchValue);
        break;
      default:
        query.eq(searchKey, searchValue)
    }
  }

  return globalGetData({
    page, pageSize, additionalData, query, ignoredFilterColumns: ['user',
      'address',
      'coupon',
      'warehouse_from',
      'variant',
      'quantity',
      'order_status'],
    filterFn: (f) => {
      return f?.coupon.name === searchValue ||
        f?.warehouse_from.name === searchValue ||
        f?.category_content.quantity === searchValue ||
        f?.order_content.product_variant.sku === searchValue ||
        f?.order_status.order_status_content.status === searchValue

    }
  })

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
      case 'status':
        query.ilike(`return_status_content.status`, searchValue);
        break;
      default:
        query.eq(searchKey, searchValue)
    }
  }

  return globalGetData({
    page, pageSize, additionalData, query, ignoredFilterColumns: ['status'],
    filterFn: (f) => f?.return_status_content?.status === searchValue
  })

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
    .eq("order_status_content.language_id", additionalData?.languageId)


  if (searchValue) {
    switch (searchKey) {
      case 'status':
        query.ilike(`order_status_content.status`, searchValue);
        break;
      default:
        query.eq(searchKey, searchValue)
    }
  }

  return globalGetData({
    page, pageSize, additionalData, query, ignoredFilterColumns: ['status'],
    filterFn: (f) => f?.order_status_content.status === searchValue
  })

};

export const getReturnRequests = async (page, pageSize, additionalData) => {

  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const query = supabase
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
      additionalData?.languageId
    )
  if (searchValue) {
    switch (searchKey) {
      case 'name':
        query.ilike(`return_status.name`, searchValue);
        break;
      case 'order':
        query.eq(`order.order_number`, searchValue);
        break;
      case 'variant':
        query.ilike(`product_variant.sku`, searchValue);
        break;
      default:
        query.eq(searchKey, searchValue)
    }
  }

  return globalGetData({
    page, pageSize, additionalData, query, ignoredFilterColumns: ['order', 'variant', 'name'],
    filterFn: (f) => {

      return f?.return_status.name === searchValue ||
        f?.order.order_number === searchValue ||
        f?.product_variant.sku === searchValue

    }
  })
};


export const getProducts = async (page, pageSize, additionalData) => {
  const ignoredFilterColumns = ['name', 'category', 'description']

  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;
  if (page > 1 && CURRENT_SEARCH_DATA?.searchValue === searchValue && CURRENT_SEARCH_DATA?.searchKey === searchKey) {
    return {
      data: CURRENT_SEARCH_DATA?.data?.slice(start, end),
      count: CURRENT_SEARCH_DATA?.data?.length
    }
  }

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
    ).eq("category.category_content.language_id", additionalData?.languageId)
    .eq("product_content.language_id", additionalData?.languageId);

  if (additionalData?.filter) {
    query.eq("category_id", additionalData?.filter);
  }

  if (searchValue) {
    switch (searchKey) {
      case 'name':
        query
          .ilike('product_content.name::text', `%${searchValue}%`)
        break;
      case 'description':
        query.ilike('product_content.description', `%${searchValue}%`);
        break;
      case 'category':
        query.ilike('category.category_content.title', `%${searchValue}%`);
        break;
      case 'brand':
        query.eq('brand.name', searchValue);
        break;
      default:
        query.eq(searchKey, searchValue)
    }
  }

  return globalGetData({
    page, pageSize, additionalData, query, ignoredFilterColumns: ['category', 'name', 'description', 'brand'],
    filterFn: product => product?.product_content?.length && product?.category?.category_content?.length

  })

};

export const getProductFeatures = async (table, page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
    .range(start, end);
  return response;
};

export const getCountries = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
    .range(start, end);
  return response;
};

export const getOffers = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
    .eq("offer_content.language_id", additionalData?.languageId)
    .range(start, end);
  return response;
};

export const getCollections = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
    .eq("collection_content.language_id", additionalData?.languageId)
    .range(start, end);
  return response;
};

export const getComments = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
    .eq("product.product_content.language_id", additionalData?.languageId)
    .range(start, end);
  return response;
};

export const getColors = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
    .eq("color_content.language_id", additionalData?.languageId)
    .range(start, end);

  return response;
};

export const getSizes = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
    .eq("category.category_content.language_id", additionalData?.languageId)
    .eq("size_content.region_id", additionalData?.regionId)
    .range(start, end);

  return response;
};

export const getChartContent = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
    .range(start, end);
  return response;
};

export const getChartData = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
    .eq("size.size_content.region_id", additionalData?.regionId)
    .eq("chart.chart_content.language_id", additionalData?.languageId)
    .eq("product.product_content.language_id", additionalData?.languageId)
    .range(start, end);
  return response;
};

export const getAddresses = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const response = await supabase
    .from("address")
    .select(
      `
    *,
    country ( id, name )
  `,
      { count: "exact" }
    )
    .range(start, end);

  return response;
};

export const getPoints = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const response = await supabase
    .from("point")
    .select(
      `
    *,
    point_content(*, language_id,language(name))
  `,
      { count: "exact" }
    )
    .eq("point_content.language_id", additionalData?.languageId)
    .range(start, end);

  return response;
};

export const getStocks = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
      additionalData?.languageId
    )
    .range(start, end);

  return response;
};

export const getWarehouses = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const response = await supabase
    .from("warehouse")
    .select(
      `
    *,
    address(id,name:line_one)
  `,
      { count: "exact" }
    )
    .range(start, end);

  return response;
};

export const getWarehouseAvailability = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
    .range(start, end);

  return response;
};



export const getNews = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const response = await supabase
    .from("news")
    .select(
      `
    *,
    news_content(*, language(name))
    `,
      { count: "exact" }
    )
    .eq("news_content.language_id", additionalData?.languageId)
    .range(start, end);
  return response;
};

export const getUsers = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const response = await supabase
    .from("user")
    .select(
      `
  *,
  title:user_type(*, name:title)
  `,
      { count: "exact" }
    )
    .range(start, end);
  return response;
};


export const getUsersCart = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

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
      additionalData?.languageId
    ).eq('user_id', additionalData?.userId)
    .range(start, end);
  return response;
};


export const getUserAddresses = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const response = await supabase.from("user_address").select(`
    *,
    address(*, name:line_one)
    `).eq('user_id', additionalData?.userId).range(start, end);;
  return response;
};
export const getUserLikes = async (page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  const response = await supabase.from("user_like").select(`
    *,
    product(product_content(*))
    `).eq('user_id', additionalData?.userId).range(start, end);;
  return response;
};

export const getUserSubTable = async (table, page, pageSize, additionalData) => {
  let start = (page - 1) * pageSize;
  let end = page * pageSize - 1;
  let searchKey = additionalData?.search?.key;
  let searchValue = additionalData?.search?.value;

  console.log(table, page, pageSize, additionalData, 'called')
  try {
    const response = await supabase.from(table).select("*").eq('user_id', additionalData?.userId).range(start, end);
    return response;
  } catch (error) { }
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
