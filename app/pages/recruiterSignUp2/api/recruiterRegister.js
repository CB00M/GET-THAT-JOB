"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function register(prevState, formData) {
  try {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const company = formData.get("company-name");
    const email = formData.get("email");
    let password = formData.get("password");
    const website = formData.get("website");
    const about = formData.get("aboutCompany");
    const companyLogo = formData.get("attachment");
    const fileName = uuidv4();

    const publicAttachmentUrl = supabase.storage
      .from("attachments")
      .getPublicUrl(fileName);

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const { dataAuth, errorAuth } = await supabase.auth.signUp({
      email,
      password,
    });
    if (errorAuth) {
      console.log("errorAuth", errorAuth);
      return { message: "Sign up Error" };
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
        companyLogo: publicAttachmentUrl.data.publicUrl,
      },
    ]);
    if (error) {
      console.log("error", error);
      return { message: "Register Fail" };
    }
    console.log("Register successful!!");

    const { uploadError } = await supabase.storage
      .from("attachments")
      .upload(fileName, companyLogo);
    if (error) {
      console.log("error:", uploadError);
      return { message: "Upload company logo Error" };
    }
    console.log("Upload Successful:", publicAttachmentUrl);

    console.log(company, email, password, website, about);
    return { success: true };
  } catch (error) {
    console.log("error", error);
    return { message: "Server Error" };
  }
}
