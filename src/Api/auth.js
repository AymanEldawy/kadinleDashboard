import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";
import Cookies from "js-cookie";


export const getUser = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const response = await supabase
      .from("user")
      .select(
        `
    *,
    role:user_type(*)
  `
      )
      .eq("id", user?.id);
    return response?.data?.[0];
  } catch (error) {}
};

export const getUserRole = async () => {};

// Log in function
export const login = async (email, password) => {
  const {
    error,
    data: { session, user },
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Cookies.set("KADINLES_ADMIN", "ahmed", {
  //   expires: hour,
  //   path: "/",
  // });

  return { user, session, error };
};

// Log out function
export const logout = async () => {
  const response = await supabase.auth.signOut();
  if (response?.error) return;
  Cookies.remove("KADINLE_ADMIN");

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
