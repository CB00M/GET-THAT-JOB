"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function applyJobData(data) {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);
  const interested = data.get("interest-working");
  const newCV = data.get("newCV");
  const newFilename = uuidv4();

  const { error } = await supabase.storage
    .from("CV_file")
    .upload("file_path", newCV, {
      upsert: true,
    });
  if (error) {
    console.log("error", error);
    return false;
  }
}
