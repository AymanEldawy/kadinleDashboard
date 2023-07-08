import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";

// get languages
export const getLanguages = async () => {
  const response = await supabase.from("language").select();
  return response;
};

// add new language
export const addNewLanguage = async (language) => {
  const response = await supabase
    .from("language")
    .insert(language)
    .select(language);
  return response;
};

// delete language
export const deleteLanguage = async (ids) => {
  const response = await supabase.from("language").delete().in("id", ids);
  return response;
};

// update language
export const updateLanguage = async (item) => {
  const response = await supabase
    .from("language")
    .update(item)
    .eq("id", item.id)
    .single();
  return response;
};
