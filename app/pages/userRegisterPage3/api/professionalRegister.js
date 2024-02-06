"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function register(formData) {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const title = formData.get("title");
  const experience = formData.get("experience");
  const education = formData.get("education");
  const email = formData.get("email");
  const password = formData.get("password");
  const phoneNumber = formData.get("phoneNumber");
  const birthdate = formData.get("birthdate");
  const linkedin = formData.get("linkedin");

  const { data, error } = await supabase.from("Professionalusers").insert([
    {
      title,
      experience,
      education,
      email,
      password,
      phonenumber: phoneNumber,
      birthdate,
      linkedin,
    },
  ]);
  if (error) {
    console.log("error", error);
    return false;
  }
  console.log("Register successful!!");
  console.log(
    title,
    experience,
    education,
    email,
    password,
    phoneNumber,
    birthdate,
    linkedin
  );
}
