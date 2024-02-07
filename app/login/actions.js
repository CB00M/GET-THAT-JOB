"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server.js";
import { redirect } from "next/dist/server/api-utils";
import { isRedirectError } from "next/dist/client/components/redirect";

const cookieStore = cookies();

const supabase = createClient(cookieStore);

export const emailFromProfessionalUsers = async (email) => {
  try {
    const { data, error } = await supabase
      .from("Professionalusers")
      .select("*")
      .eq("email", email);

    if (error) {
      console.error("Email error:", error.message);
      return false;
    }
    return data.length > 0;
  } catch (error) {
    console.error("Email error:", error.message);
    return false;
  }
};

export const passwordProfessionalUsers = async (password) => {
  try {
    const { data, error } = await supabase
      .from("Professionalusers")
      .select("*")
      .eq("password", password);

    if (error) {
      console.error("Password error:", error.message);
      return false;
    }
    return data.length > 0;
  } catch (error) {
    console.error("Password error:", error.message);
    return false;
  }
};

export const emailFromRecruiterUsers = async (email) => {
  try {
    const { data, error } = await supabase
      .from("Recruiterusers")
      .select("*")
      .eq("email", email);

    if (error) {
      console.error("Email error:", error.message);
      return false;
    }
    return data.length > 0;
  } catch (error) {
    console.error("Email error:", error.message);
    return false;
  }
};

export const passwordRecruiterUsers = async (password) => {
  try {
    const { data, error } = await supabase
      .from("Recruiterusers")
      .select("*")
      .eq("password", password);

    if (error) {
      console.error("Password error:", error.message);
      return false;
    }
    return data.length > 0;
  } catch (error) {
    console.error("Password error:", error.message);
    return false;
  }
};

export const handleLoginRecruiter = async (formData) => {
  const { email, password } = formData;

  const emailInDatabase = await emailFromRecruiterUsers(email);
  console.log("Found email: ", emailInDatabase);
  if (!emailInDatabase) {
    console.error("User not found");
    return;
  }

  const passwordInDatabase = await passwordRecruiterUsers(password);
  console.log("Found password: ", passwordInDatabase);
  if (!passwordInDatabase) {
    console.error("Password not found");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { user } = data;

    if (error) {
      console.error("login error: ", error.message);
      return { error: `Login error: ${error.message}` };
    }

    cookies().set("user", JSON.stringify(user));
    redirect("/pages/recruiter");
  } catch (error) {
    console.error("Login check: ", error.message);
    if (isRedirectError(error)) {
      throw error;
    }
  }
};
