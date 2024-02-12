// "use server";
// import { createClient } from "@supabase/supabase-js";
// import { cookies } from "next/headers";
// import { supabaseUrl, supabaseKey } from "../../../../utils/supabase/supabase";

// import { v4 as uuidv4 } from "uuid";

// async function signUp(formData) {
//   const cookieStore = cookies();
//   const supabase = createClient(supabaseUrl, supabaseKey);

//   const company = formData.get("company-name");
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const website = formData.get("website");
//   const aboutCompany = formData.get("aboutCompany");
//   const attachment = formData.get("attachment");
//   const fileName = uuidv4();

//   // console.log("attachment:", attachment);

//   const { dataAuth, errorAuth } = await supabase.auth.signUp({
//     email,
//     password,
//     phonenumber: phoneNumber,
//   });
//   if (errorAuth) {
//     console.log("errorAuth", errorAuth);
//     return false;
//   }
//   console.log("Auth successful!!");
//   console.log(email, password, phoneNumber);

//   const { error } = await supabase.storage
//     .from("attachments")
//     .upload(fileName, attachment);
//   if (error) {
//     console.log("error:", error);
//     return false;
//   }
//   const publicAttachmentUrl = supabase.storage
//     .from("attachments")
//     .getPublicUrl(fileName);

//   console.log("Upload Company Logo Successful:", publicAttachmentUrl);
//   const { data, insertError } = await supabase.from("Recruiterusers").insert([
//     {
//       company,
//       email,
//       password,
//       website,
//       about_company: aboutCompany,
//       attachment: publicAttachmentUrl.data.publicUrl,
//     },
//   ]);

//   if (insertError) {
//     console.error("found some error", insertError);
//     return false;
//   }
//   console.log("register successfully !!");
//   console.log(company, email, password, website, aboutCompany);
// }

// export default signUp;
