import { supabase } from "../Helpers/SupabaseConfig/SupabaseConfig";

export const getUser = async () => {
  const response = await supabase.auth.getUser();
  return response?.user;
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
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Sign up function
export const signup = async (email, password, firstName, lastName) => {
  const auth = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName },
    },
  });
  const { data, error } = await supabase.from("user").insert({
    id: auth?.data?.user?.id,
    email: email,
    first_name: firstName,
    last_name: lastName,
  });
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
