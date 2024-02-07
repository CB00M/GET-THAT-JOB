"use server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { supabaseUrl, supabaseKey } from "../../../../utils/supabase/supabase";
import { v4 as uuidv4 } from "uuid";

async function signUp(formData) {
  const cookieStore = cookies();
  const supabase = createClient(supabaseUrl, supabaseKey);
  const companyWebsite = formData.get("companyWebsite");
  const aboutCompany = formData.get("aboutCompany");
  const attachment = formData.get("attachment");
  const fileName = uuidv4();

  console.log("attachment:", attachment);

  const { error } = await supabase.storage
    .from("attachments")
    .upload(fileName, attachment);
  if (error) {
    console.log("error:", error);
    return false;
  }
  const publicAttachmentUrl = supabase.storage
    .from("attachments")
    .getPublicUrl(fileName);

  console.log("Upload Successful:", publicAttachmentUrl);
  const { data, insertError } = await supabase
    .from("recruiterInformation")
    .insert([
      {
        company_website: companyWebsite,
        about_company: aboutCompany,
        attachment: publicAttachmentUrl.data.publicUrl,
      },
    ]);

  if (insertError) {
    console.error("found some error", insertError);
    return false;
  }
  console.log("register successful");
}

export default signUp;
