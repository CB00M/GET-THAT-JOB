import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xldcnixdyucdznvziubx.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZGNuaXhkeXVjZHpudnppdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3MDEzMzEsImV4cCI6MjAyMjI3NzMzMX0.8oPe4EzhETnEG_9YloGRei_hoMNqEsd53SHAUg8LCRw";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
