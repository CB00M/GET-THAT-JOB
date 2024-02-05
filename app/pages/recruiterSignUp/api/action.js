"use server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { supabaseUrl, supabaseKey } from "../../../../utils/supabase/supabase";

async function recruiterSignUp(formData) {
  //const cookie = cookies();
  const supabase = createClient(supabaseUrl, supabaseKey);

  const recruiterData = {
    companyName: formData.get("company-name"),
    email: formData.get("email"),
    password: formData.get("password"),
    companyWebsite: formData.get("company-website"),
    aboutCompany: formData.get("about-company"),
  };

  const { data, error } = await supabase
    .from("recruiterInformation")
    .insert([
      {
        company_name: recruiterData.companyName,
        email: recruiterData.email,
        password: recruiterData.password,
        company_website: recruiterData.companyWebsite,
        about_company: recruiterData.aboutCompany,
      },
    ]);

  if (error) {
    console.error("Found some error", error);
    return false;
  }
  console.log("Signup Successfully");
}

export default recruiterSignUp;
