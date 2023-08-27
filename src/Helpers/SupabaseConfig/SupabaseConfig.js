import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "http://kadinle.com:8000",
  // "http://kadinle.com:8443",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAic2VydmljZV9yb2xlIiwKICAgICJpc3MiOiAic3VwYWJhc2UiLAogICAgImlhdCI6IDE2ODgyNDUyMDAsCiAgICAiZXhwIjogMTg0NjA5ODAwMAp9.Zbwwgxvz9VZm0zUmI-PN-xn71S_LGJYOnow-CKqoPgI"
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg4MjQ1MjAwLAogICAgImV4cCI6IDE4NDYwOTgwMDAKfQ.HDK-rOGDvAX5VVXWG9dOVOC61Ey__kZWYuoEeBJATL4"
);
