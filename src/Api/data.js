import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";

export const uuidLanguageEn = `c53d7987-f51a-4b47-9ee0-3215becdce17`;
export const uuidRegionEn = `83f4acbc-d93b-4b3d-9c78-11d1b353517a`;

export const getCategories = async () => {
  const response = await supabase
    .from("category")
    .select(
      `
    *,
     category_content(title, description , 
      language:language_id (id, name )
      )
    
     `
    )
    .eq("category_content.language_id", uuidLanguageEn);
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

export const getColors = async () => {
  const response = await supabase
    .from("color")
    .select(
      `
    *,
     color_content(name, 
      language:language_id (id, name )
      )
     `
    )
    .eq("color_content.language_id", uuidLanguageEn);
  return response;
};
export const getSizes = async () => {
  const response = await supabase
    .from("size")
    .select(
      `
    *,
      category (category_content(id, category_id, title)),
      size_content(size_id, name, region(id, name))
      `
    )
    .eq("category.category_content.language_id", uuidLanguageEn)
    .eq("size_content.region_id", uuidRegionEn);

  return response;
};
export const getChartContent = async () => {
  const response = await supabase
    .from("chart_content")
    .select(
      `
    *,
    chart(id, number),
    language(id, name)
     `
    )
    .eq("language_id", uuidLanguageEn);
  return response;
};
export const getChartData = async () => {
  const response = await supabase
    .from("chart_data")
    .select(
      `
    *,
    product (id, product_content (name, language_id )),
    size (id, size_content (size_id, name, region_id ))
    
     `
    )
    .eq("size.size_content.region_id", uuidRegionEn);
  return response;
};

//
// id,
// supplier:supplier_id ( name ),
// purchaser:purchaser_id ( name )
export const getAddresses = async () => {
  const response = await supabase.from("address").select(`
    *,
    country ( id, name )
  `);

  return response;
};
