"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function register(prevState, formData) {
  try {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const title = formData.get("title");
    const experience = formData.get("experience");
    const education = formData.get("education");
    const email = formData.get("email");
    let password = formData.get("password");
    const phoneNumber = formData.get("phoneNumber");
    const birthdate = formData.get("birthdate");
    const linkedin = formData.get("linkedin");
    const name = formData.get("name");
    const CVFile = formData.get("CV");
    const fileName = uuidv4();

    const publicAttachmentUrl = supabase.storage
      .from("CV_file")
      .getPublicUrl(fileName);

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const { dataAuth, errorAuth } = await supabase.auth.signUp({
      email,
      password,
      phonenumber: phoneNumber,
    });
    if (errorAuth) {
      console.log("errorAuth", errorAuth);
      return { message: "Sign up Error" };
    }
    console.log("Auth successful!!");
    console.log(email, password, phoneNumber);

    const { data, error } = await supabase.from("Professionalusers").insert([
      {
        title,
        name,
        experience,
        education,
        email,
        password,
        phonenumber: phoneNumber,
        birthdate,
        linkedin,
        file_cv: publicAttachmentUrl.data.publicUrl,
      },
    ]);
    if (error) {
      console.log("error", error);
      return { message: "Register Fail" };
    }

    const { uploadError } = await supabase.storage
      .from("CV_file")
      .upload(fileName, CVFile);
    if (error) {
      console.log("error:", uploadError);
      return { message: "Upload CV Error" };
    }

    console.log("Upload CV Successful:", publicAttachmentUrl);

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
    return { success: true };
  } catch (error) {
    console.log("error", error);
    return { message: "Server Error" };
  }
}
