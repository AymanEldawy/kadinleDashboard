import { createClient } from "@supabase/supabase-js";

const URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
export const supabase = createClient(URL, API_KEY, {
  global: {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2ODgyNDUyMDAsCiAgICAiZXhwIjogMTg0NjA5ODAwMAp9.Zbwwgxvz9VZm0zUmI-PN-xn71S_LGJYOnow-CKqoPgI",
    },
  },
});
