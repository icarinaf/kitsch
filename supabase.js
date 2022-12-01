import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://zoxtueqvwtbicliqyxzq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpveHR1ZXF2d3RiaWNsaXF5eHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg2NTQ4NjQsImV4cCI6MTk4NDIzMDg2NH0.ZQyKzo1sxAiBbDwAxSsdhueKI4kTi6wQahJhB5D79Q8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
