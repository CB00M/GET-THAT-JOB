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

export const handleLoginRecruiter = async (formData, res) => {
  const { email, password } = formData;

  const emailInDatabase = await emailFromRecruiterUsers(email);
  console.log("Found email: ", emailInDatabase);
  if (!emailInDatabase) {
    console.error("User not found");
    return { error: "Invalid login credentials" };
  }

  const passwordInDatabase = await passwordRecruiterUsers(password);
  console.log("Found password: ", passwordInDatabase);
  if (!passwordInDatabase) {
    console.error("Password not found");
    return { error: "Invalid login credentials" };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { user } = data;
    /*login error message*/
    if (error && error.message && !isRedirectError(error)) {
      console.error("login error: ", error.message);
      return { error: `Login error: ${error.message}` };
    }

    cookies().set("user", JSON.stringify(user));
    res.status(307).redirect("/pages/recruiter");
  } catch (error) {
    console.error("Login check:", error.message);
    if (isRedirectError(error)) {
      throw error;
    }
  }
};

export const handleLoginProfessional = async (formData, res) => {
  const { email, password } = formData;

  const emailInDatabase = await emailFromProfessionalUsers(email);
  console.log("Found email: ", emailInDatabase);
  if (!emailInDatabase) {
    console.error("User not found");
    return;
  }

  const passwordInDatabase = await passwordProfessionalUsers(password);
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

    if (error && error.message && !isRedirectError(error)) {
      console.error("login error: ", error.message);
      return { error: `Login error: ${error.message}` };
    }

    cookies().set("user", JSON.stringify(user));
    res.status(307).redirect("/pages/professional");
  } catch (error) {
    console.error("Login check: ", error.message);
    if (isRedirectError(error)) {
      throw error;
    }
  }
};

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    cookies().delete("user");
    redirect("/");
  }
};

export default handleLogout;
