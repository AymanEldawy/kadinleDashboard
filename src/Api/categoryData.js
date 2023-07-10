import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";

export const getCategories = async () => {
  const response = await supabase.from("category").select(`
    id, 
    numeric,
    category_content ( id, title, language_id )
  `);

  return response;
};
