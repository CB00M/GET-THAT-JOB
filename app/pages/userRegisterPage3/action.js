"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function register(formData) {
  const title = formData.get("title");
  const experience = formData.get("experience");
  const education = formData.get("education");
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const { data, error } = await supabase
    .from("user_registerpage3")
    .insert([{ title, experience, education }]);

  console.log(title, experience, education);
}
