"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import "../../globals.css";
import { handleLogout } from "@/app/login/actions";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  const supabase = createClient();
  const [profile, setProfile] = useState([]);

  //เก็บข้อมูลจากหน้าlogin
  const [userEmail, setUserEmail] = useState("");
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    const keepUserData = JSON.parse(localStorage.getItem("keepUserData"));
    const email = keepUserData?.email || "";
    setUserEmail(email);
  }, []);

  console.log(userEmail); // ตรวจสอบค่า companyEmail ว่าถูกต้องหรือไม่

  //fetchข้อมูลcompany

  const fetchCompanyData = async () => {
    try {
      const { data, error } = await supabase
        .from("Professionalusers")
        .select("*")
        .eq("email", userEmail);

      if (error) {
        console.error("Error fetching jobs:", error.message);
      } else {
        setProfile(data);
        //console.log(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchCompanyData();
    }
  }, [userEmail]);

  //เปลี่ยนแปลงข้อมูล;
  const handleInputChange = (e, id) => {
    const { name, value } = e.target;

    const updatedProfile = profile.map((item) => {
      if (item.id === id) {
        return { ...item, [name.toLowerCase()]: value }; // แก้ชื่อฟิลด์ให้เป็นตัวพิมพ์เล็กทั้งหมด
      }
      return item;
    });

    setProfile(updatedProfile);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
  };

  const updateProfileInSupabase = async () => {
    try {
      // อัปโหลดไฟล์ CV ไปยัง Supabase Storage
      await uploadCVToStorage();

      // อัปเดตข้อมูลในตาราง Professionalusers ใน Supabase
      const { data, error } = await supabase
        .from("Professionalusers")
        .upsert(profile);

      if (error) {
        console.error("Error updating profile:", error.message);
      } else {
        console.log("Profile updated successfully:", data);
        // ทำตามกระบวนการที่ต้องการหลังจากการอัปเดตข้อมูล
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  const uploadCVToStorage = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("file_cv") // ระบุชื่อ bucket ของ Supabase Storage
        .upload(`${cvFile.name}`, cvFile);

      if (error) {
        console.error("Error uploading CV:", error.message);
      } else {
        console.log("CV uploaded successfully:", data);
        // ทำตามกระบวนการที่ต้องการหลังจากอัปโหลดเสร็จ
      }
    } catch (error) {
      console.error("Error uploading CV:", error.message);
    }
  };

  // const handleInputChange = (e, id) => {
  //   const { name, value } = e.target;

  //   const updatedProfile = profile.map((item) => {
  //     if (item.id === id) {
  //       return { ...item, [name]: value };
  //     }
  //     return item;
  //   });

  //   setProfile(updatedProfile);
  //   console.log("check:", updatedProfile);
  // };

  // //updateข้อมูล
  // const updateJobInSupabase = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("Professionalusers")
  //       .update(profile) // ใช้ Object profile เพื่ออัปเดตข้อมูล
  //       .eq("email", userEmail);

  //     if (error) {
  //       console.error("Error updating profile:", error.message);
  //     } else {
  //       console.log("Profile updated successfully:", data);
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error.message);
  //   }
  // };

  //logout
  const handleLogoutClick = () => {
    handleLogout();
    alert("You have been logged out.");
  };

  return (
    <>
      <div className="w-full h-[900px] bg-neutral-100  items-start inline-flex">
        {/*nav bar */}
        <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start flex">
            <div className="px-4 pb-[32px] flex-col justify-center items-start flex">
              <img className="w-[136px] h-10" src="/images/gtj-logo.png" />
            </div>
            <Link href={"/pages/findJob"}>
              <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
                <img className="w-[24px] h-[24px]" src="/images/serach.png" />
                <div
                  className="grow text-neutral-700 leading-normal"
                  style={inter.style}
                >
                  Find that job
                </div>
              </div>
            </Link>
            <Link href={"/pages/yourApplications"}>
              <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
                <img
                  className="w-[24px] h-[24px]"
                  src="/images/your applications.png"
                />
                <div
                  className="grow text-zinc-600 leading-normal"
                  style={inter.style}
                >
                  Your applications
                </div>
              </div>
            </Link>

            <Link href={"/pages/editProfileProfessional"}>
              <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
                <img className="w-[24px] h-[24px]" src="/images/profile.png" />
                <div
                  className="grow text-zinc-600 leading-normal"
                  style={inter.style}
                >
                  Profile
                </div>
              </div>
            </Link>
            <div className="w-60 px-4 py-3 bg-neutral-200 justify-start items-start gap-2 inline-flex">
              <img className="w-[24px] h-[24px]" src="/images/logout.png" />
              <div
                className=" text-zinc-600 leading-normal"
                style={inter.style}
              >
                <button onClick={handleLogoutClick}>Log out</button>
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-3 inline-flex w-60 px-4">
            <div
              className="text-zinc-600 text-xs leading-none"
              style={montserrat.style}
            >
              © 202X - Get That Job
            </div>
          </div>
        </div>
        {/* main */}

        <div className="w-[1000px] h-[900px] py-[10px] px-[20px] ml-[150px]">
          {/* Profile */}
          {Array.isArray(profile) &&
            profile.map((item) => {
              return (
                <div key={item.id}>
                  {" "}
                  <p
                    className=" py-[10px]  text-neutral-700 text-[34px] "
                    style={montserrat.style}
                  >
                    Profile
                  </p>
                  <div className="text-[24px]" style={montserrat.style}>
                    <p>Personal information</p>
                  </div>
                  <p
                    className=" pt-[10px]
        text-[10px] tracking-widest"
                    style={inter.style}
                  >
                    EMAIL
                  </p>
                  <input
                    name="EMAIL"
                    className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
                    type="text"
                    placeholder=""
                    value={item.email}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                  <p
                    className=" pt-[10px]
        text-[10px] tracking-widest"
                    style={inter.style}
                  >
                    NAME
                  </p>
                  <input
                    name="NAME"
                    className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
                    type="text"
                    placeholder=""
                    value={item.name}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                  <p
                    className=" pt-[10px]
        text-[10px] tracking-widest"
                    style={inter.style}
                  >
                    PHONE
                  </p>
                  <input
                    name="PHONE"
                    className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
                    type="number"
                    placeholder=""
                    value={item.phone}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                  <p
                    className=" pt-[10px]
        text-[10px] tracking-widest"
                    style={inter.style}
                  >
                    BIRTHDATE
                  </p>
                  <input
                    name="BIRTHDATE"
                    className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
                    type="date"
                    placeholder=""
                    value={item.birthdate}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                  <div
                    className="text-neutral-400 text-xs font-normal font-['Inter'] leading-none tracking-wide mt-1"
                    style={montserrat.style}
                  >
                    +[country code][number]
                  </div>
                  <p
                    className=" pt-[10px]
      text-[10px] tracking-widest"
                    style={inter.style}
                  >
                    LINKEDIN URL
                  </p>
                  <input
                    name="LINKEDIN URL"
                    className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
                    type="text"
                    placeholder=""
                    value={item.linkedin}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                  <div
                    className="text-[24px] pt-[30px]"
                    style={montserrat.style}
                  >
                    <p>Professional information</p>
                  </div>
                  <p
                    className="text-[12px] text-[#616161] tracking-wide"
                    style={inter.style}
                  >
                    Changes made here will be reflected in your future
                    applications
                  </p>
                  <p
                    className=" pt-[10px]
        text-[10px] tracking-widest"
                    style={inter.style}
                  >
                    TITLE
                  </p>
                  <input
                    name="TITLE"
                    className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
                    type="text"
                    placeholder=""
                    value={item.title}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                  <p
                    className=" pt-[10px]
        text-[10px] tracking-widest"
                    style={inter.style}
                  >
                    PROFESSIONAL EXPERIENCE
                  </p>
                  <input
                    name="TITLE"
                    className="w-[760px] h-[272px] rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
                    type="text"
                    placeholder=""
                    value={item.experience}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                  <p
                    className=" pt-[10px]
        text-[10px] tracking-widest"
                    style={inter.style}
                  >
                    EDUCATION
                  </p>
                  <input
                    name="TITLE"
                    className="w-[760px] h-[132px]  rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
                    type="text"
                    placeholder=""
                    value={item.education}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                  <div
                    className="relative pt-[10px]
        text-[10px] tracking-widest"
                  >
                    UPLOAD/UPDATE YOUR CV
                    <br />
                    <Image
                      src="/images/uplode-icon.svg"
                      width={20}
                      height={20}
                      alt="arrow"
                      className="absolute left-[15px] top-[36px]"
                    />
                    <input
                      type="file"
                      name="file_cv"
                      className="customfile text-sm pt-[5px] "
                      onChange={handleFileChange}
                    />
                  </div>
                  <p
                    className="text-neutral-400 text-[12px] tracking-wide mt-1"
                    style={inter.style}
                  >
                    Only PDF. Max size 5MB
                  </p>
                  <Link href={"/pages/findJob"}>
                    <button
                      className="border-2 border-[#F48FB1] tracking-widest text-white rounded-2xl text-[14px] bg-[#F48FB1] mt-5 mb-5 py-1 px-3 w-[155px] h-[40px]"
                      style={inter.style}
                      onClick={() => {
                        updateProfileInSupabase();
                        uploadCVToStorage();
                      }}
                    >
                      SAVE CHANGES
                    </button>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
