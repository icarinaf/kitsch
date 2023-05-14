import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://qiqwtxosgqqkpolwscqq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcXd0eG9zZ3Fxa3BvbHdzY3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwMjAwODcsImV4cCI6MTk5OTU5NjA4N30.a3zrIiLV1lDU9mcVnleCbfkOxkwglPg2-RhkKIKqXQQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
