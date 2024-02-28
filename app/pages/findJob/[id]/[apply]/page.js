"use client";
import React, { useState, useEffect } from "react";
import { Montserrat, Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import Sidebar from "../../../../components/ProfessionalSidebar/sidebarYourApplication/page";
import { HiChevronLeft } from "react-icons/hi";
import Image from "next/image";
import "../../../../globals.css";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import applyJobData from "./api/action";

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

  console.log("user data :", userData);
  console.log("user email :", userEmail);
  console.log("jobs :", jobs);

  //const [uploadCV, setUploadCV] = useState(false);

  /*async function getDetailJob() {
    let { data, error } = await supabase
      .from("job_posting")
      .select("*")
      .eq("id", params.id);
    if (error || !data) {
      console.log("error:", error);
    }
    setJob(data[0]);
  }

  useEffect(() => {
    getDetailJob();
  }, [params.id]);*/

  useEffect(() => {
    fetchJobs();
  }, [params.id]); // ใช้ useEffect เพื่อเรียก fetchJobs เมื่อ jobId เปลี่ยน

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
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };

  //ดึงข้อมูลจาก login

  const keepUserDataD = JSON.parse(localStorage.getItem("keepUserData"));
  const email = keepUserDataD?.email || "";

  useEffect(() => {
    if (email) {
      setUserEmail(email);
    }
  }, [email]);

  console.log(userEmail); // ตรวจสอบค่า companyEmail ว่าถูกต้องหรือไม่

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
        console.log("data :", data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchApplication(userEmail);
    }
  }, [params.id, userEmail]);

  //เปลี่ยนแปลงinput user *** ของน้องปิ๊งเดิมเอาไว้เก็บค่า experience
  // const handleInputChange = (e, id) => {
  //   const { name, value } = e.target;

  //   // คัดลอก userData มาเป็นอาเรย์ใหม่โดยอัปเดตข้อมูลเฉพาะผู้ใช้ที่มี id ตรงกับที่ถูกแก้ไข
  //   const updatedUserData = userData.map((user) => {
  //     if (user.id === id) {
  //       return { ...user, [name]: value }; // อัปเดตค่าที่ต้องการเปลี่ยนแปลง
  //     }
  //     return user;
  //   });

  //   setUserData(updatedUserData); // อัปเดต state ของข้อมูลผู้ใช้
  // };

  //updateข้อมูล *** ของน้องปิ๊งเดิมเอาไว้อัพเดทค่า
  // const updateJobInSupabase = async (id, updatedData) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from("Professionalusers")
  //       .update(updatedData)
  //       .eq("email", userEmail);

  //     if (error) {
  //       console.error("Error updating user:", error.message);
  //       return null;
  //     }

  //     return data;
  //   } catch (error) {
  //     console.error("Error updating user:", error.message);
  //     return null;
  //   }
  // };
  const sendApplication = async (event) => {
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
      const { data: candidateData, error } = await supabase
        .from("your_applications")
        .insert([data]); // ใช้ createClient ที่ import มาจาก custom path

      if (error) {
        throw error;
      }

      console.log("send application successfully:", candidateData);
    } catch (error) {
      console.error("Error inserting job posting:", error.message);
    }
  };

  return (
    <div className="w-full h-[1050px] bg-neutral-100  items-start inline-flex">
      <Sidebar />

      {/*Job Apply */}

      <div className="w-[1000px] h-[800px] py-[10px] px-[20px] ml-[100px]">
        <div className=" flex pt-[30px] mb-[-20px]">
          <button
            onClick={() => {
              router.push(`/pages/findJob/${job.id}`);
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
            <>
              <div className="mt-5">
                <header className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Image
                      src="/images/logo-web/Web-logo.svg"
                      alt="logo web"
                      width={80}
                      height={80}
                    ></Image>
                    <div className="flex flex-col tracking-wide">
                      <h2
                        className="text-[24px] text-[#373737]"
                        style={montserrat.style}
                      >
                        The company name SA
                      </h2>
                      <p
                        className="flex items-center gap-1 mt-1 font-extrabold text-[14px] tracking-widest text-[#616161]"
                        style={inter.style}
                      >
                        <Image
                          src="/images/IconButton.svg"
                          alt="button follow"
                          width={38}
                          height={38}
                        ></Image>
                        FOLLOWING
                      </p>
                    </div>
                  </div>
                  <div>
                    <button>
                      <Image
                        src="/images/send.svg"
                        alt="send application"
                        width={233}
                        height={56}
                      ></Image>
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
                  POSTED 2 DAYS AGO
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
            </>
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
              SEND YOUR CV UPDATED
              <div className="text-[#616161] text-[14px] flex gap-5 pt-[3px]">
                <span>
                  <input
                    type="radio"
                    id="all"
                    name="filter-your-candidates"
                    className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                  />
                  Use current CV
                </span>
                <span>
                  <input
                    type="radio"
                    id="waiting"
                    name="filter-your-candidates"
                    className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                  />
                  Upload new CV
                </span>
              </div>
            </div>

            {/* Upload CV Button */}

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
                      value={user.experience}
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
                      WHY ARE YOU INTERESTED IN WORKING AT THE COMPANY NAME SA
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
