"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/dist/server/api-utils";

const cookieStore = cookies();

const supabase = createClient(cookieStore);

export const checkEmailDatabase = async (email) => {
  try {
    const { data, error } = await supabase
      .from("Professionalusers")
      .select("*")
      .eq("email", email);

    if (error) {
      console.error("Error checking email", error.message);
      return false;
    }
    return data.length > 0;
  } catch (error) {
    console.error("Error checking email", error.message);
    return false;
  }
};

export const checkPasswordDatabase = async (password) => {
  try {
    const { data, error } = await supabase
      .from("Professionalusers")
      .select("*")
      .eq("password", password);

    if (error) {
      console.error("Error checking password", error.message);
      return false;
    }
    return data.length > 0;
  } catch (error) {
    console.error("Error checking password", error.message);
    return false;
  }
};

export const handleLogin = async (formData) => {
  const { email, password } = formData;

  const emailInDatabase = await checkEmailDatabase(email);
  console.log("Is email exist:", emailInDatabase);
  if (!emailInDatabase) {
    console.error("User not found");
    return;
  }

  const validationPassword = await checkPasswordDatabase(password);
  console.log("Is password exist:", validationPassword);
  if (!validationPassword) {
    console.error("Invalid password");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    const { user } = data;

    if (error) {
      console.error("Login error", error.message);
      return { error: `Login error: ${error.message}` };
    }
    cookies().set("user", JSON.stringify(user));
    redirect("/pages/professional");
  } catch (error) {
    console.error("Login check:", error.message);
    if (isRedirectError(error)) {
      throw error;
    }
  }
};
