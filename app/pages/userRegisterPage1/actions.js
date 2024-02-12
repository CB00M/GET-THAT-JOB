"use server";
import { createClient } from "@/utils/supabase/server";
import { log } from "console";
import { cookies } from "next/headers";

export async function register(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("user")
    .insert([{ email, password }])
    .select();

  // const { data, error } = await supabase
  // .from('user')
  // .insert([
  //   { some_column: 'someValue', other_column: 'otherValue' },
  // ])
  // .select()

  if (error) {
    console.log("found some error");
  }
  console.log("Register successful!");

  //   console.log(title, experience, education);
}
