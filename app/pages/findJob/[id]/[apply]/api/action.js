"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

async function applyJobData(formData) {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const interestedWoring = formData.get("interest-working");

  const newCV = formData.get("newCV");
  const newFilename = uuidv4();

  const publicCVUrl = supabase.storage
    .from("file_cv")
    .getPublicUrl(newFilename);

  console.log(interestedWoring);

  const { uploadError } = await supabase.storage
    .from("CV_file")
    .upload(newFilename, newCV);
  if (uploadError) {
    console.log("error:", uploadError);
    return { message: "Upload is Error" };
  }

  console.log("Upload new CV Successfully:", publicCVUrl);

  const { data, error } = await supabase.from("your_applications").insert([
    {
      interested_comment: interestedWoring,
      file_cv: publicCVUrl.data.publicUrl,
    },
  ]);
  if (error) {
    console.log("error", error);
    return { message: "send application is Fail" };
  }
  console.log("Send application is successful!!");
}

export default applyJobData;
