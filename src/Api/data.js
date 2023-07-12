import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";

export const uuidLanguageEn = `c53d7987-f51a-4b47-9ee0-3215becdce17`;
export const uuidRegionEn = `83f4acbc-d93b-4b3d-9c78-11d1b353517a`;

export const getCategories = async () => {
  const response = await supabase.from("category").select(
    `
    *,
     category_content(title, description , language_id,
      language(id, name )
      )
    
     `
  );
  return response;
};

export const getOrders = async () => {
  const response = await supabase.from("order").select(
    `
      *,
      user(first_name, last_name, profile_img),
      address(country(name), name:city),
      warehouse_from(name),
      coupon(name:code),
      order_content(quantity),
      order_status(numerical, status_content:order_status_content(order_status:status, language_id))
   `
  );
  return response;
};
export const getProducts = async () => {
  const response = await supabase.from("product").select(
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
      
   `
  );
  return response;
};
export const getProductFeatures = async (table) => {
  const response = await supabase.from(table).select(
    `
      *,
      language_id,
      language(id, name)
   `
  );
  return response;
};

export const getCountries = async () => {
  const response = await supabase.from("country").select(
    `
      *,
      currency (id, name,code, rate, exchange_percent),
      region (id, name)
   `
  );
  return response;
};

export const getOffers = async () => {
  const response = await supabase.from("offer").select(
    `
    *,
    offer_content(id, name, description, media,language_id,
      language(id, name)
      )
     `
  );
  return response;
};
export const getCollections = async () => {
  const response = await supabase.from("collection").select(
    `
    *,
    collection_content(id, name, language_id,
      language (id, name )
      )
     `
  );
  return response;
};
export const getComments = async () => {
  const response = await supabase.from("comment").select(
    `
    *,
    comment_media(*),
    user(id, first_name, last_name, profile_img),
    product(id, product_content(*))
     `
  );
  return response;
};

export const getColors = async () => {
  const response = await supabase.from("color").select(
    `
    *,
     color_content(id, name, language_id,
      language (id, name )
      )
     `
  );
  return response;
};
export const getSizes = async () => {
  const response = await supabase.from("size").select(
    `
    *,
      category (category_content(id, category_id, title, language_id)),
      size_content(size_id, name, region(id, name))
      `
  );

  return response;
};
export const getChartContent = async () => {
  const response = await supabase.from("chart_content").select(
    `
    *,
    chart(id, number),
    language_id,
    language(id, name)
     `
  );
  return response;
};
export const getChartData = async () => {
  const response = await supabase.from("chart_data").select(
    `
    *,
    chart(chart_content(id, name)),
    product (id, product_content (name, language_id )),
    size (id, size_content (size_id, name, region_id ))
    
     `
  );
  return response;
};

export const getAddresses = async () => {
  const response = await supabase.from("address").select(`
    *,
    country ( id, name )
  `);

  return response;
};
export const getUserAddresses = async () => {
  const response = await supabase.from("user_address").select(`
    *,
    address(*, name:line_one),
    users(*)
    `);

  // user(first_name, last_name, profile_img),
  return response;
};
export const getUsersCart = async () => {
  const response = await supabase.from("user_cart").select(`
    *,
    user(first_name, last_name, profile_img),
    variant(product(product_content(product_id, name, language_id)))
    `);

  return response;
};
export const getUserInvite = async () => {
  const response = await supabase.from("user_invite").select(`
    *,
    auth(*)
    `);

  return response;
};
export const getPoints = async () => {
  const response = await supabase.from("point").select(`
    *,
    point_content(*, language_id,language(name))
  `);

  return response;
};
