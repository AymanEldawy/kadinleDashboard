import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  // "http://kadinle.com:8000",
  "http://kadinle.com:8443",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjg4MjQ1MjAwLAogICAgImV4cCI6IDE4NDYwOTgwMDAKfQ.HDK-rOGDvAX5VVXWG9dOVOC61Ey__kZWYuoEeBJATL4"
);
// export const supabase = createClient(
//   "https://jvpzcgockztzpmyuojxf.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2cHpjZ29ja3p0enBteXVvanhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk2OTE3MzAsImV4cCI6MTk5NTI2NzczMH0.1jgjs4ikcmy02Xphtbc045VKgR7y0jwMW3NuGI4iC4w"
// );
