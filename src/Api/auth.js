import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";

export const getUser = async () => {
  try {
    const response = await supabase.auth.getUser();
    if (!response?.data?.user?.id) return;
    const userType = await supabase
      .from("user_type")
      .select("*")
      .eq("id", response?.data?.user?.user_type_id);
    return {
      ...response?.data?.user,
      role: userType?.data?.[0],
    };
  } catch (error) {}
};

// Log in function
export const login = async (email, password) => {
  const {
    error,
    data: { session, user },
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user, session, error };
};

// Log out function
export const logout = async () => {
  const response = await supabase.auth.signOut();
  console.log(response);
  return response;
};

// Sign up function
export const signup = async (values) => {
  const auth = await supabase.auth.signUp({
    email: values?.email,
    password: values?.password,
    options: {
      data: { first_name: values?.first_name, last_name: values?.last_name },
    },
  });
  let newValues = values;
  delete newValues["password"];
  const response = await supabase.from("user").insert({
    id: auth?.data?.user?.id,
    ...newValues,
  });
  return response;
};

export const forgotPassword = async (email) => {
  try {
    const { error, data } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      return error;
    } else {
      return "Password reset request sent!";
    }
  } catch (error) {}
};

// // complete user info
// export async function completedUserInfo(information) {
//   const { data, error } = await supabase.from("user").insert(information);
//   return data;
// }
