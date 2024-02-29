"use client";

import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { handleLogout } from "@/app/login/actions";
import { Textarea } from "@chakra-ui/react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [type, setType] = useState("");
  const [minRange, setMinRange] = useState("");
  const [maxRange, setMaxRange] = useState("");
  const [aboutJob, setAboutJob] = useState("");
  const [mandaturyRequier, setMandaturyRequier] = useState("");
  const [optionalRequier, setOptionalRequier] = useState("");

  //เก็บข้อมูลจากหน้าlogin
  const [companyEmail, setCompanyEmail] = useState("");

  const keepDataD = JSON.parse(localStorage.getItem("keepData"));
  const email = keepDataD?.email || "";

  useEffect(() => {
    if (email) {
      setCompanyEmail(email);
    }
  }, [email]);

  console.log(companyEmail); // ตรวจสอบค่า companyEmail ว่าถูกต้องหรือไม่

  const handleSubmit = async (event) => {
    event.prevent.default();
    try {
      // เก็บข้อมูลลงในตัวแปรในรูปแบบของ JSON object
      const data = {
        title,
        category: selectCategory,
        type,
        minRange: minRange,
        maxRange: maxRange,
        aboutJob: aboutJob,
        mandaturyRequier: mandaturyRequier,
        optionalRequier: optionalRequier,
        //ใส่ข้อมูลidคนlogin
        company_email: companyEmail,
      };

      // เรียกใช้งานฟังก์ชัน insert() เพื่อเพิ่มข้อมูลลงในตาราง job_posting
      const { data: jobData, error } = await supabase
        .from("job_posting")
        .insert([data]); // ใช้ createClient ที่ import มาจาก custom path

      if (error) {
        throw error;
      }

      console.log("Job posting inserted successfully:", jobData);
    } catch (error) {
      console.error("Error inserting job posting:", error.message);
    }
  };

  //logout
  const handleLogoutClick = () => {
    handleLogout();
    alert("You have been logged out.");
  };

  return (
    <>
      <div className="w-full h-[900px] bg-neutral-100  items-start inline-flex">
        <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start flex">
            <div className="px-4 pb-[32px] flex-col justify-center items-start flex">
              <Image src="/images/gtj-logo.png" width={136} height={40} />
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
              <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
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
              <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
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
        {/*ping */}

        <div className="w-[800px] h-[800px] py-[10px] px-[20px] ml-[150px] ">
          <p
            className=" py-[10px]  text-neutral-700 text-[34px] "
            style={montserrat.style}
          >
            Create new job posting
          </p>
          <p
            className=" pt-[5px]  text-neutral-700 text-[20px] "
            style={montserrat.style}
          >
            Main information
          </p>
          <form onSubmit={handleSubmit}>
            <p
              className=" pt-[10px]
             text-zinc-600 text-[10px] "
              style={inter.style}
            >
              JOB TITLE
            </p>
            <input
              name="title"
              className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
              type="text"
              placeholder="Software engineer"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <p
              className=" pt-[10px]
            text-zinc-600 text-[10px]"
              style={inter.style}
            >
              JOB CATEGORY
            </p>

            <select
              name="category"
              value={selectCategory}
              onChange={(event) => {
                setSelectCategory(event.target.value);
              }}
              className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2 "
            >
              <option value="">Select or create a category</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="legal">Legal</option>
              <option value="education">Education</option>
              <option value="government">Government</option>
              <option value="sales">Sales</option>
            </select>

            <p
              className=" pt-[10px]
            text-zinc-600 text-[10px]"
              style={inter.style}
            >
              TYPE
            </p>
            <label>
              <select
                name="type"
                className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2 "
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <option value="">Select a type</option>
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
              </select>
            </label>
            <p
              className=" pt-[10px]
            text-zinc-600 text-[10px]"
              style={inter.style}
            >
              SALARY RANGE
            </p>
            <div className="relative">
              <Image
                className="  absolute top-4 left-[13px]"
                src="/images/money-dollar-circle-fill.svg"
                width={22}
                height={22}
                alt="money-dollar-circle-fill"
              />
              <Image
                className="absolute top-4 left-[136px] "
                src="/images/money-dollar-circle-fill.svg"
                width={22}
                height={22}
                alt="money-dollar-circle-fill"
              />
              <input
                name="minRange"
                className="w-[100px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-11 "
                type="text"
                placeholder="min"
                value={minRange}
                onChange={(event) => {
                  setMinRange(event.target.value);
                }}
              />{" "}
              <span className="text-[30px] text-neutral-400">- </span>{" "}
              <input
                className="w-[100px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-11 "
                type="text"
                name="maxRange"
                placeholder="max"
                value={maxRange}
                onChange={(event) => {
                  setMaxRange(event.target.value);
                }}
              />
            </div>
            <p
              className=" pt-[30px]  text-neutral-700 text-[20px] "
              style={montserrat.style}
            >
              Additional information
            </p>
            <p
              className=" pt-[10px]
            text-zinc-600 text-[10px]"
              style={inter.style}
            >
              ABOUT THE JOB POSITION
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
                  // สไตล์เมื่อกล่องข้อความได้รับการ focus
                  borderColor: "black", // เปลี่ยนสีเส้นขอบเป็นสีดำเมื่อได้รับการ focus
                  boxShadow: "none",
                },
              }}
              placeholder="Describe the main function and charecteristic of your job position"
              value={aboutJob}
              onChange={(event) => {
                setAboutJob(event.target.value);
              }}
              name="aboutJob"
            />
            <p
              className=" pt-[10px]
            text-zinc-600 text-[10px]"
              style={inter.style}
            >
              MANDATORY REQUIREMANTS
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
                  // สไตล์เมื่อกล่องข้อความได้รับการ focus
                  borderColor: "black", // เปลี่ยนสีเส้นขอบเป็นสีดำเมื่อได้รับการ focus
                  boxShadow: "none",
                },
              }}
              placeholder="List each mandatiry requirement in new line"
              value={mandaturyRequier}
              onChange={(event) => {
                setMandaturyRequier(event.target.value);
              }}
              name="mandaturyRequier"
            />

            <p
              className=" pt-[10px]
            text-zinc-600 text-[10px]"
              style={inter.style}
            >
              OPTIONAL REQUIREMENT
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
                  // สไตล์เมื่อกล่องข้อความได้รับการ focus
                  borderColor: "black", // เปลี่ยนสีเส้นขอบเป็นสีดำเมื่อได้รับการ focus
                  boxShadow: "none",
                },
              }}
              placeholder="List each optional requirement in new line"
              value={optionalRequier}
              onChange={(event) => {
                setOptionalRequier(event.target.value);
              }}
              name="optionalRequier"
            />
            <Link href={"/pages/jobPosting"}>
              <button
                onClick={handleSubmit}
                type="submit"
                className="border-2 border-[#F48FB1] text-white rounded-2xl bg-[#F48FB1] mt-5 mb-5 py-1 px-3 "
              >
                POST THIS JOB
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
