"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function register(formData) {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const company = formData.get("company");
  const email = formData.get("email");
  const password = formData.get("password");
  const website = formData.get("website");
  const about = formData.get("aboutCompany");

  const { dataAuth, errorAuth } = await supabase.auth.signUp({
    email,
    password,
  });
  if (errorAuth) {
    console.log("errorAuth", errorAuth);
    return false;
  }
  console.log("Auth successful!!");
  console.log(email, password);

  const { data, error } = await supabase.from("Recruiterusers").insert([
    {
      company,
      email,
      password,
      website,
      about_company: about,
    },
  ]);
  if (error) {
    console.log("error", error);
    return false;
  }
  console.log("Register successful!!");
  console.log(company, email, password, website, about);
}
