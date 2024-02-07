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

export const passwordRecruiterUsers = async (password) => {
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

export const handleLoginRecruiter = async (fromData) => {
  const { email, password } = fromData;

  const emailInDatabase = await emailFromRecruiterUsers(email);
  console.log("Found email: ", emailInDatabase);
  if (!emailInDatabase) {
    console.error("User not found");
    return;
  }

  const passwordInDatabase = await passwordRecruiterUsers(email);
  console.log("Found email: ", passwordInDatabase);
  if (!emailInDatabase) {
    console.error("User not found");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("login error: ", error.message);
      return { error: `Login error: ${error.message}` };
    }

    const { user } = data;
    cookies().set("user", JSON.stringify(user));
    redirect("/pages/recruiter");
  } catch (error) {
    console.error("Login check: ", error.message);
    if (isRedirectError(error)) {
      throw error;
    }
  }
};
