"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Textarea } from "@chakra-ui/react";
import "../../globals.css";
import { handleLogout } from "@/app/login/actions";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  const supabase = createClient();
  const [profile, setProfile] = useState([]);

  //เก็บข้อมูลจากหน้าlogin
  const [companyEmail, setCompanyEmail] = useState("");

  const keepDataD = JSON.parse(localStorage.getItem("keepData"));
  const email = keepDataD?.email || "";

  useEffect(() => {
    if (email) {
      setCompanyEmail(email);
    }
  }, []);

  console.log(companyEmail); // ตรวจสอบค่า companyEmail ว่าถูกต้องหรือไม่

  //fetchข้อมูลcompany

  const fetchCompanyData = async () => {
    try {
      const { data, error } = await supabase
        .from("Recruiterusers")
        .select("*")
        .eq("email", companyEmail);

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
    if (companyEmail) {
      fetchCompanyData();
    }
  }, [companyEmail]);

  //เปลี่ยนแปลงข้อมูล
  const handleInputChange = (e, id) => {
    const { name, value } = e.target;

    const updatedProfile = profile.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });

    setProfile(updatedProfile);
    console.log("check:", updatedProfile);
  };

  //updateข้อมูล
  const updateJobInSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from("Recruiterusers")
        .update(profile) // ใช้ Object profile เพื่ออัปเดตข้อมูล
        .eq("email", companyEmail);

      if (error) {
        console.error("Error updating profile:", error.message);
      } else {
        console.log("Profile updated successfully:", data);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  //เก็บอีเมลล์ใหม่
  useEffect(() => {
    if (profile.length > 0) {
      fetchEmail();
    }
  }, [profile]);

  //เก็บอีเมลล์ใหม่
  const [newEmail, setNewEmail] = useState("");

  const fetchEmail = async () => {
    try {
      const { data, error } = await supabase
        .from("Recruiterusers")
        .select("email")
        .eq("id", profile[0]?.id); // ใช้ไอดีของโปรไฟล์เพื่อดึงเฉพาะอีเมลที่เปลี่ยนแปลง
      if (error) {
        console.error("Error fetching email:", error.message);
      } else {
        setNewEmail(data[0]?.email || "");
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching email:", error.message);
    }
  };

  let keepCompanyData = { email: newEmail };
  let keepCompanyDatas = JSON.stringify(keepCompanyData);
  localStorage.setItem("keepCompanyData", keepCompanyDatas);

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
              <Image
                src="/images/get-that-job-logo.svg"
                width={136}
                height={40}
              />
            </div>
            <Link href={"/pages/jobPosting"}>
              <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
                <Image
                  src="/images/job-posting-pic.svg"
                  width={22}
                  height={22}
                />
                <div
                  className="grow text-zinc-600 leading-normal"
                  style={inter.style}
                >
                  Job Posting
                </div>
              </div>
            </Link>
            <Link href={`/pages/createNewJobPosting`}>
              <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
                <Image
                  src="/images/create-new-job-pic.svg"
                  width={18}
                  height={20}
                />
                <div
                  className="grow text-neutral-700 leading-normal"
                  style={inter.style}
                >
                  Create New Job
                </div>
              </div>
            </Link>
            <Link href={`/pages/editProfileRecruiter`}>
              <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
                <Image src="/images/profile.png" width={24} height={24} />
                <div
                  className="grow text-zinc-600 leading-normal"
                  style={inter.style}
                >
                  Profile
                </div>
              </div>
            </Link>
            <div className="w-60 px-4 py-3 bg-neutral-200 justify-start items-start gap-2 inline-flex">
              <Image src="/images/logout.png" width={24} height={24} />
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
        <div className="w-[1000px] h-[900px] py-[10px] px-[20px] ml-[150px] ">
          {/* Profile */}
          {Array.isArray(profile) &&
            profile.map((item) => {
              return (
                <div key={item.id}>
                  <p
                    className=" py-[10px]  text-neutral-700 text-[34px] "
                    style={montserrat.style}
                  >
                    Profile
                  </p>
                  {/* Company logo */}
                  <div>
                    <div>
                      <Image />
                    </div>
                    <div>
                      <p
                        className=" pt-[10px]
              text-[10px] "
                        style={inter.style}
                      >
                        COMPANY LOGO
                      </p>
                      <div className="relative">
                        <Image
                          src="/images/uplode-icon.svg"
                          width={20}
                          height={20}
                          alt="arrow"
                          className="absolute left-[15px] top-[8px]"
                        />
                        <input
                          type="file"
                          name="file_cv"
                          className="customfile text-sm  "
                        />
                      </div>
                      <p
                        style={inter.style}
                        className="text-[12px] text-[#8E8E8E]"
                      >
                        PNG, JPEG, IMG
                      </p>
                    </div>
                    {/* company email */}
                    <p
                      className=" pt-[10px]
              text-[10px]"
                      style={inter.style}
                    >
                      COMPANY EMAIL
                    </p>
                    <p className="w-[389px] h-9 rounded-lg text-neutral-700 pl-2 py-1">
                      {item.email}
                    </p>
                    {/* company name */}
                    <p
                      className=" pt-[10px]
              text-[10px]"
                      style={inter.style}
                    >
                      COMPANY NAME
                    </p>
                    <input
                      name="company"
                      className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
                      type="text"
                      placeholder=""
                      value={item.company}
                      onChange={(e) => handleInputChange(e, item.id)}
                    />
                    {/* company website */}
                    <p
                      className=" pt-[10px]
              text-[10px]"
                      style={inter.style}
                    >
                      COMPANY WEBSITE
                    </p>
                    <input
                      name="website"
                      className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
                      type="text"
                      placeholder=""
                      value={item.website}
                      onChange={(e) => handleInputChange(e, item.id)}
                    />
                    {/* about the company */}
                    <p
                      className=" pt-[10px]
             text-[10px]"
                      style={inter.style}
                    >
                      {" "}
                      ABOUT THE COMPANY{" "}
                    </p>
                    <Textarea
                      sx={{
                        width: "760px",
                        height: "76px",
                        borderRadius: "lg",
                        color: "neutral.700",
                        borderWidth: "2px",
                        borderColor: "#F48FB1",
                        paddingLeft: "2px",
                        paddingBottom: "6px",
                        background: "white",
                        paddingLeft: "10px",
                        boxShadow: "none",
                        "&:focus": {
                          borderColor: "black",
                          boxShadow: "none",
                        },
                      }}
                      placeholder=""
                      name="about_company"
                      value={item.about_company}
                      onChange={(e) => handleInputChange(e, item.id)}
                    />
                    {/* update button */}
                    <br />
                    <Link href={"/pages/jobPosting"}>
                      <button
                        className="border-2 bg-[#F48FB1] hover:bg-pink-500 active:bg-pink-700 text-white rounded-2xl bg-[#F48FB1] mt-5 mb-5 py-1 px-3"
                        onClick={() => updateJobInSupabase()}
                      >
                        UPDATE PROFILE
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
