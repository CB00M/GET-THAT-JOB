"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Link from "next/link";
import { Textarea } from "@chakra-ui/react";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

/*export default function Page({ params }) {
  const supabase = createClient();
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    let { data, error } = await supabase.from("job_posting").select("*").where id in (`${jobId}`);

    if (error || !data) {
      console.log("error", error);
    }

    setJobs(data);
  };

  return <div>My Post: {params.jobId}</div>;
}*/
export default function Page({ params }) {
  const supabase = createClient();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, [params.jobId]); // ใช้ useEffect เพื่อเรียก fetchJobs เมื่อ jobId เปลี่ยน

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("job_posting")
        .select("*")
        .eq("id", params.jobId); // ใช้ eq() เพื่อกรองตาม id

      if (error) {
        console.error("Error fetching jobs:", error.message);
      } else {
        setJobs(data || []);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };

  //
  const handleInputChange = (e, jobId) => {
    const { name, value } = e.target;

    // คัดลอก jobs มาเป็นอาเรย์ใหม่โดยอัปเดตข้อมูลเฉพาะตำแหน่งงานที่มี jobId ตรงกับที่ถูกแก้ไข
    const updatedJobs = jobs.map((job) => {
      if (job.id === jobId) {
        return { ...job, [name]: value }; // อัปเดตค่าที่ต้องการเปลี่ยนแปลง
      }
      return job;
    });

    setJobs(updatedJobs); // อัปเดต state ของตำแหน่งงาน
    console.log("check:", updatedJobs);
  };

  //updateข้อมูล
  const updateJobInSupabase = async (jobId, updatedData) => {
    try {
      const { data, error } = await supabase
        .from("job_posting")
        .update(updatedData)
        .eq("id", jobId);

      if (error) {
        console.error("Error updating job1:", error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error updating job2:", error.message);
      return null;
    }
  };
  return (
    <>
      {/*{jobs.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.aboutJob}</p>
          <input
            className="border border-black"
            type="text"
            name="title"
            value={job.title}
            onChange={(e) => handleInputChange(e, job.id)} // ใช้ฟังก์ชัน handleInputChange และส่ง job.id เพื่อระบุตำแหน่งงานที่ต้องการแก้ไข
          />
          <textarea
            className="border border-black"
            name="aboutJob"
            value={job.aboutJob}
            onChange={(e) => handleInputChange(e, job.id)}
          />
        </div>
      ))}*/}

      <div className="w-full h-[900px] bg-neutral-100  items-start inline-flex">
        <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start flex">
            <div className="px-4 pb-[32px] flex-col justify-center items-start flex">
              <Image src="/images/gtj-logo.png" width={136} height={40} />
            </div>
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
              <Image src="/images/job-posting-pic.svg" width={22} height={22} />
              <div
                className="grow text-zinc-600 leading-normal"
                style={inter.style}
              >
                Job Posting
              </div>
            </div>
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
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
              <Image src="/images/profile.png" width={24} height={24} />
              <div
                className="grow text-zinc-600 leading-normal"
                style={inter.style}
              >
                Profile
              </div>
            </div>
            <div className="w-60 px-4 py-3 bg-neutral-200 justify-start items-start gap-2 inline-flex">
              <Image src="/images/logout.png" width={24} height={24} />
              <div
                className=" text-zinc-600 leading-normal"
                style={inter.style}
              >
                Log out
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
            Edit job posting
          </p>
          <p
            className=" pt-[5px]  text-neutral-700 text-[20px] "
            style={montserrat.style}
          >
            Main information
          </p>
          {/*render */}
          {jobs.map((job) => {
            return (
              <div key={job.id}>
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
                  value={job.title}
                  onChange={(e) => handleInputChange(e, job.id)}
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
                  value={job.category}
                  onChange={(e) => handleInputChange(e, job.id)}
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
                    value={job.type}
                    onChange={(e) => handleInputChange(e, job.id)}
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
                    className="absolute top-4 left-[13px]"
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
                    value={job.minRange}
                    onChange={(e) => handleInputChange(e, job.id)}
                  />{" "}
                  <span className="text-[30px] text-neutral-400">- </span>{" "}
                  <input
                    className="w-[100px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-11 "
                    type="text"
                    name="maxRange"
                    placeholder="max"
                    value={job.maxRange}
                    onChange={(e) => handleInputChange(e, job.id)}
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
                  value={job.aboutJob}
                  onChange={(e) => handleInputChange(e, job.id)}
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
                  value={job.mandaturyRequier}
                  onChange={(e) => handleInputChange(e, job.id)}
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
                  value={job.optionalRequier}
                  onChange={(e) => handleInputChange(e, job.id)}
                  name="optionalRequier"
                />
                <Link href={`/pages/jobPosting`}>
                  <button
                    onClick={() => updateJobInSupabase(job.id, job)}
                    className="border-2 border-[#F48FB1] text-white rounded-2xl bg-[#F48FB1] mt-5 mb-5 py-1 px-3 "
                  >
                    EDITE THIS JOB
                  </button>
                </Link>
              </div>
            );
          })}
          <form></form>
        </div>
      </div>
    </>
  );
}
