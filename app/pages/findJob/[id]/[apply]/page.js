"use client";
import React, { useState, useEffect } from "react";
import { Montserrat, Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import { handleLogout } from "@/app/login/actions";
import { HiChevronLeft } from "react-icons/hi";
import Image from "next/image";
import "../../../../globals.css";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import applyJobData from "./api/action";
import Link from "next/link";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function ApplyPage({ params }) {
  const router = useRouter();
  const supabase = createClient();
  const [userData, setUserData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [jobs, setJobs] = useState([]);
  const [interesting, setInteresting] = useState("");
  const [experience, setExperience] = useState("");
  const [companyData, setCompanyData] = useState("");
  const [companyName, setCompanyName] = useState([]);
  const [companyLogo, setCompanyLogo] = useState([]);

  console.log("user data :", userData);
  console.log("user email :", userEmail);
  console.log("jobs :", jobs);
  console.log("company data :", companyData);
  console.log("companyName :", companyName);
  console.log(userEmail); // ตรวจสอบค่า companyEmail ว่าถูกต้องหรือไม่

  //ดึงข้อมูลจาก login

  const keepUserDataD = JSON.parse(localStorage.getItem("keepUserData"));
  const email = keepUserDataD?.email || "";

  const [uploadCV, setUploadCV] = useState(false);

  /*async function getDetailJob() {
    let { data, error } = await supabase
      .from("job_posting")
      .select("*")
      .eq("id", params.id);
    if (error || !data) {
      console.log("error:", error);
    }
    setJobs(data[0]);
  }

  useEffect(() => {
    getDetailJob();
  }, [params.id]);*/

  // useEffect(() => {
  //   fetchJobs();
  // }, [params.id]); // ใช้ useEffect เพื่อเรียก fetchJobs เมื่อ jobId เปลี่ยน

  //ดึงข้อมูลงาน
  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("job_posting")
        .select("*")
        .eq("id", params.id); // ใช้ eq() เพื่อกรองตาม id

      if (error) {
        console.error("Error fetching jobs:", error.message);
      } else {
        setJobs(data || []);
        setCompanyData(data[0].company_email);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };

  //ดึงข้อมูลชื่อบริษัทเิปดรับสมัคร
  const getCompanyName = async () => {
    let { data, error } = await supabase
      .from("Recruiterusers")
      .select("*")
      .eq("email", companyData);
    if (error || !data) {
      console.log("error:", error);
      NotFound(); // แก้เป็น router.push("/404") หรือหน้าที่เหมาะสมสำหรับการแสดงผลเมื่อไม่พบข้อมูลบริษัท
    }
    setCompanyLogo(data[0].companyLogo);
    setCompanyName(data[0].company);
  };

  //ดึงข้อมูลการสมัคร
  const fetchApplication = async () => {
    try {
      const { data, error } = await supabase
        .from("Professionalusers")
        .select("*")
        .eq("email", userEmail); // ใช้ eq() เพื่อกรองตาม id

      if (error) {
        console.error("Error fetching jobs:", error.message);
      } else {
        setUserData(data || []);
        setExperience(data[0].experience);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };

  const sendApplication = async () => {
    try {
      // เก็บข้อมูลลงในตัวแปรในรูปแบบของ JSON object
      const data = {
        name: userData[0].name,
        email,
        interesting: interesting,
        experience: experience,
        phonenumber: userData[0].phonenumber,
        linkedin: userData[0].linkedin,
        file_cv: userData[0].file_cv,
        candidate_id: userData[0].id,
        job_following_id: jobs[0].id,
      };

      // เรียกใช้งานฟังก์ชัน insert() เพื่อเพิ่มข้อมูลลงในตาราง job_posting
      const { data: error } = await supabase
        .from("your_applications")
        .insert([data]); // ใช้ createClient ที่ import มาจาก custom path

      if (error) {
        throw error;
      }

      console.log("send application successfully");
    } catch (error) {
      console.error("Error inserting job posting:", error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchJobs(params.id);
    }
    if (email) {
      setUserEmail(email);
    }
    if (userEmail) {
      fetchApplication(userEmail);
    }
    if (companyData) {
      getCompanyName(companyData);
    }
  }, [userEmail, companyData]);

  //logout
  const handleLogoutClick = () => {
    handleLogout();
    alert("You have been logged out.");
  };

  return (
    <div className="w-full h-[1050px] bg-neutral-100  items-start inline-flex">
      {/*Sidebar */}
      <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex">
        <div className="flex-col justify-start items-start flex">
          <div className="px-4 pb-[32px] flex-col justify-center items-start flex">
            <img className="w-[136px] h-10" src="/images/gtj-logo.png" />
          </div>
          <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
            <img className="w-[24px] h-[24px]" src="/images/serach.png" />
            <div
              className="grow text-neutral-700 leading-normal"
              style={inter.style}
            >
              Find that job
            </div>
          </div>
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
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
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
            <div className=" text-zinc-600 leading-normal" style={inter.style}>
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

      {/*Job Apply */}

      <div className="w-[1000px] h-[800px] py-[10px] px-[20px] ml-[100px]">
        <div className=" flex pt-[30px] mb-[-20px]">
          <button
            onClick={() => {
              router.push(`/pages/findJob/${jobs[0].id}`);
            }}
            className="text-[14px] tracking-widest"
            style={inter.style}
          >
            <HiChevronLeft className="w-6 h-5 items-center text-[#616161]" />
            <p className="relative bottom-[20px] left-[25px] text-[#616161]">
              BACK
            </p>
          </button>
        </div>
        {jobs.map((job) => {
          return (
            <div className="mt-5">
              <header className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Image
                    src={companyLogo}
                    alt="logo web"
                    width={80}
                    height={80}
                  ></Image>
                  <div className="flex flex-col tracking-wide">
                    <h2
                      className="text-[24px] text-[#373737]"
                      style={montserrat.style}
                    >
                      {companyName}
                    </h2>
                  </div>
                </div>
                <div>
                  <button
                    className="m-auto cursor-pointer"
                    onClick={sendApplication}
                  >
                    <div
                      className="text-white bg-[#f48fb1] hover:bg-pink-700 w-[233px] h-[56px] text-[14px] rounded-2xl flex justify-center items-center gap-3"
                      style={inter.style}
                    >
                      <Image
                        src="/images/logo-web/mail-line.svg"
                        width={20}
                        height={20}
                        alt="letter"
                      />
                      <div className="tracking-wider">SEND APPLICATION</div>
                    </div>
                  </button>
                </div>
              </header>
              <h1 className="text-center text-5xl">{job.title}</h1>
              <p className="flex items-center gap-1 text-[10px] justify-center mt-3">
                <Image
                  src="/images/clock.svg"
                  alt="day"
                  width={15}
                  height={15}
                ></Image>
                POSTED 1 DAYS AGO
              </p>
              <div className="flex justify-around items-center my-3">
                <div className="h-[77px] w-2/6 border border-[#BF5F82] flex flex-col justify-center items-center rounded-lg  p-2 bg-white">
                  <h2
                    className="text-base text-[#616161]"
                    style={montserrat.style}
                  >
                    Category
                  </h2>
                  <p
                    className="flex items-end text-2xl gap-2 text-[#373737]"
                    style={montserrat.style}
                  >
                    <Image
                      src="/images/logo-web/Group.svg"
                      alt="category"
                      width={29}
                      height={29}
                    ></Image>
                    {job.category}
                  </p>
                </div>
                <div className="h-[77px] w-[208px] border border-[#BF5F82] flex flex-col justify-center items-center rounded-lg  p-2 bg-white drop-shadow-lg">
                  <h2
                    className="text-base text-[#616161]"
                    style={montserrat.style}
                  >
                    Type
                  </h2>
                  <p
                    className="flex items-end text-2xl gap-2 text-[#373737]"
                    style={montserrat.style}
                  >
                    <Image
                      src="/images/logo-web/calendar-2-line.svg"
                      alt="job type"
                      width={29}
                      height={29}
                    ></Image>
                    {job.type}
                  </p>
                </div>
                <div className="h-[77px] w-[271px] border border-[#BF5F82] flex flex-col justify-center items-center rounded-lg  p-2 bg-white drop-shadow-lg">
                  <h2
                    className="text-base text-[#616161]"
                    style={montserrat.style}
                  >
                    Salary
                  </h2>
                  <p
                    className="flex items-end text-2xl gap-2 text-[#373737]"
                    style={montserrat.style}
                  >
                    <Image
                      src="/images/logo-web/money-circle-line.svg"
                      alt="salary"
                      width={29}
                      height={29}
                    ></Image>
                    {job.minRange} - {job.maxRange}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex flex-col">
          <div>
            <h3
              className="text-2xl text-[#BF5F82] mt-[50px]"
              style={montserrat.style}
            >
              Complete your application
            </h3>
            <div
              className="text-[#373737] text-[10px] pt-[10px] font-medium tracking-wide"
              style={montserrat.style}
            >
              SEND YOUR CV
              <div className="text-[#616161] text-[14px] flex gap-5 pt-[3px]">
                <span>
                  <input
                    type="radio"
                    id="all"
                    name="filter-your-candidates"
                    className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                    onClick={() => setUploadCV(!uploadCV)}
                  />
                  Use current CV
                </span>
                {/* <span>
                  <input
                    type="radio"
                    id="waiting"
                    name="filter-your-candidates"
                    className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                    onClick={() => setUploadCV(true)}
                  />
                  Upload new CV
                </span> */}
              </div>
            </div>

            {/* Upload CV Button */}
            {/* {uploadCV && (
              <div>
                <div className="relative flex pt-[10px]">
                  <Image
                    src="/upload-icon.png"
                    width={20}
                    height={20}
                    alt="arrow"
                    className="absolute left-[10px] top-[8px] pt-[10px]"
                  />
                  <input
                    type="file"
                    name="newCV"
                    className="customfile text-sm "
                  />
                </div>
                <p
                  className="text-[12px] text-[#8E8E8E] pt-[5px] tracking-wider"
                  style={inter.style}
                >
                  Only PDF.Max size 5MB
                </p>
              </div>
            )} */}

            {/* Upload CV Button จบ*/}
            {/* ส่วนของข้อมูลผู้ใช้ */}
            {userData.map((user) => {
              return (
                <div key={user.id}>
                  {/* ส่วนของประสบการณ์ทำงาน */}
                  <div className="text-[#373737] text-[10px] pt-[20px] tracking-widest font-medium">
                    <p
                      className="font-medium mb-[-15px] text-[#373737]"
                      style={inter.style}
                    >
                      PROFESSIONAL EXPERIENCE (TAKEN FROM YOUR PROFILE)
                    </p>
                    <br />
                    <textarea
                      className="w-full h-[272px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
                      style={inter.style}
                      type="text"
                      id="experience"
                      name="experience"
                      placeholder="..."
                      value={experience}
                      // onChange={(e) => handleInputChange(e, user.id)} ของน้องปิ๊งเดิม
                      onChange={(event) => {
                        setExperience(event.target.value);
                      }}
                    />
                  </div>
                  {/* ส่วนของความสนใจในการทำงานที่บริษัท */}
                  <div className="text-[#373737] text-[10px] pt-[20px] tracking-widest">
                    <p
                      className="font-medium mb-[-15px] text-[#373737]"
                      style={inter.style}
                    >
                      WHY ARE YOU INTERESTED IN APPLAYING ?
                    </p>
                    <br />
                    <textarea
                      className="w-full h-[112px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
                      style={inter.style}
                      type="text"
                      id="interest-working"
                      name="interest-working"
                      placeholder="Mention things about The Company Name SA that excite you. Why would you be a good candidate?"
                      value={interesting}
                      onChange={(event) => {
                        setInteresting(event.target.value);
                      }}
                    />
                    <p
                      className="text-[12px] text-[#8E8E8E]"
                      style={inter.style}
                    >
                      Between 50 and 1000 characters
                    </p>
                  </div>
                  {/* ส่วนของปุ่มส่งแอปพลิเคชัน */}
                  <Link href={"/pages/yourApplications"}>
                    <button
                      className="m-auto cursor-pointer"
                      // onClick={() => updateJobInSupabase(user.id, user)} ของน้องปิ๊งเดิมเอาไว้อัพเดทค่าไป supabase
                      onClick={sendApplication}
                    >
                      <div
                        className="text-white bg-[#f48fb1] hover:bg-pink-700 w-[233px] h-[56px] text-[14px] rounded-2xl flex justify-center items-center gap-3"
                        style={inter.style}
                      >
                        <Image
                          src="/images/logo-web/mail-line.svg"
                          width={20}
                          height={20}
                          alt="letter"
                        />
                        <div className="tracking-wider">SEND APPLICATION</div>
                      </div>
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
