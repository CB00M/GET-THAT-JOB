"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function register(formData) {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const company = formData.get("company-name");
  const email = formData.get("email");
  const password = formData.get("password");
  const website = formData.get("website");
  const about = formData.get("aboutCompany");
  const attachment = formData.get("attachment");
  const fileName = uuidv4();
  console.log("attachment:", attachment);

  const { errorAttachments } = await supabase.storage
    .from("attachments")
    .upload(fileName, attachment);
  if (errorAttachments) {
    console.log("error:", error);
    return false;
  }
  const publicAttachmentUrl = supabase.storage
    .from("attachments")
    .getPublicUrl(fileName);

  console.log("Upload Successful:", publicAttachmentUrl);

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
