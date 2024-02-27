// "use server";
// import { createClient } from "@/utils/supabase/server";
// import { error } from "console";
// import { cookies } from "next/headers";

// export async function keepData(formData) {
//   const cookiesStore = cookies();
//   const supabase = createClient(cookiesStore);

//   const title = formData.get("title");
//   const category = formData.get("category");
//   const type = formData.get("type");
//   const minRange = formData.get("minRange");
//   const maxRange = formData.get("maxRange");
//   const aboutJob = formData.get("aboutJob");
//   const mandaturyRequier = formData.get("mandaturyRequier");
//   const optionalRequier = formData.get("optionalRequier");

//   const { data, error } = await supabase.from("job_posting").insert([
//     {
//       title,
//       type,
//       category,
//       minRange,
//       maxRange,
//       aboutJob,
//       mandaturyRequier,
//       optionalRequier,
//     },
//   ]);
//   if (error) {
//     console.log("error", error);
//     return false;
//   }
//   console.log("Register successful!!");
//   console.log(
//     title,
//     type,
//     minRange,
//     maxRange,
//     aboutJob,
//     mandaturyRequier,
//     optionalRequier
//   );
// }
