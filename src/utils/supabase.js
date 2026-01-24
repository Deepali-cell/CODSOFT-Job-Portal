import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = (supabaseAccessToken = null) => {
  // 👤 Guest / public user
  if (!supabaseAccessToken) {
    return createClient(supabaseUrl, supabaseKey);
  }

  // 🔐 Logged-in user
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });
};

export default supabaseClient;
