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
import { handleLogout } from "@/app/login/actions";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  const supabase = createClient();
  const [jobs, setJobs] = useState([]);
  const [selectOption, setSelectOption] = useState("");
  const [candidate, setCandidate] = useState([]);
  //เก็บข้อมูลจากหน้าlogin
  const [companyEmail, setCompanyEmail] = useState("");

  const keepDataD = JSON.parse(localStorage.getItem("keepData"));
  const email = keepDataD?.email || "";

  //console.log(companyEmail); // ตรวจสอบค่า companyEmail ว่าถูกต้องหรือไม่

  useEffect(() => {
    if (companyEmail) {
      fetchJobs(companyEmail);
    }
    if (email) {
      setCompanyEmail(email);
    }
  }, [companyEmail]);

  //logout
  const handleLogoutClick = () => {
    handleLogout();
    alert("You have been logged out.");
  };

  // ดึงข้อมูล
  // ในส่วนของการดึงข้อมูล
  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("job_posting")
        .select("*")
        .eq("company_email", companyEmail)
        .order("closed_status", { ascending: false });

      if (error) {
        console.error("error", error);
        return;
      }

      setJobs(data || []);

      // เรียกใช้ fetchCandidate เมื่อโหลดข้อมูลตำแหน่งงานเสร็จสิ้น
      fetchCandidate(data.map((job) => job.id)); // ส่งรายการ ID ของตำแหน่งงานทั้งหมดเข้าไป
    } catch (error) {
      console.error("error", error);
    }
  };
  //
  // ในส่วนของการดึงข้อมูลผู้สมัคร
  const fetchCandidate = async (jobIds) => {
    try {
      const { data, error: candidateError } = await supabase
        .from("your_applications")
        .select("*")
        .in("job_following_id", jobIds); // ใช้ in แทน eq เพื่อระบุหลาย ID

      if (candidateError) {
        console.error("Error fetching candidates:", candidateError);
        return;
      }

      setCandidate(data || []);
      //console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  {
    /*keep open status*/
  }
  const toggleStatus = async (jobId, currentStatus) => {
    try {
      // พังก์ชันสลับสถานะ
      const newStatus = !currentStatus;

      // ถ้าค่าในคอลัม closed_status เป็น true เท่านั้น
      if (newStatus === true) {
        // อัปเดตค่าในคอลัม update_at เมื่อค่าในคอลัม closed_status เปลี่ยนแปลงเท่านั้น
        const updateAt = new Date().toISOString(); // รับค่าเวลาปัจจุบัน
        const { error } = await supabase
          .from("job_posting")
          .update({
            closed_status: newStatus,
            update_at: updateAt, // อัปเดตค่า update_at เมื่อมีการเปลี่ยนแปลงสถานะ
          })
          .eq("id", jobId);

        if (error) {
          throw error;
        }
      } else {
        // ถ้าค่าในคอลัม closed_status เป็น false ไม่ต้องทำการอัปเดตค่าในคอลัม update_at
        const { error } = await supabase
          .from("job_posting")
          .update({
            closed_status: newStatus,
          })
          .eq("id", jobId);

        if (error) {
          throw error;
        }
      }

      // อัปเดตสถานะของงานใน state
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          if (job.id === jobId) {
            return { ...job, closed_status: newStatus };
          }
          return job;
        })
      );

      // แสดงข้อผิดพลาดถ้ามี
    } catch (error) {
      console.error("Error toggling job status:", error.message);
    }
  };

  return (
    <>
      <div
        className="w-full h-full bg-neutral-100 items-start inline-flex "
        style={inter.style}
      >
        <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start flex">
            <div className="px-4 pb-[32px] flex-col justify-center items-start flex">
              <Image
                src="/images/get-that-job-logo.svg"
                width={136}
                height={40}
                alt="logo-get-that-job"
              />
            </div>
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
              <Image src="/images/job-posting-pic.svg" width={22} height={22} />
              <div
                className="grow text-zinc-600 leading-normal"
                style={inter.style}
              >
                Job Posting
              </div>
            </div>
            <Link
              href={`/pages/createNewJobPosting`}
              className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex"
            >
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
        {/*Main*/}
        <div className="w-[1000px] h-[1350px] py-[10px] px-[20px] ml-[150px] ">
          <p
            className=" py-[10px]  text-neutral-700 text-[34px] "
            style={montserrat.style}
          >
            Job Postings
          </p>
          <p
            className=" pt-[10px]
            text-zinc-600 text-[12px]"
            style={inter.style}
          >
            ABOUT THE JOB POSITION
          </p>
          <label>
            <input
              type="radio"
              name="filter"
              value=""
              className=" w-[12px] h-[12px] accent-pink-500"
              onChange={(event) => {
                setSelectOption(event.target.value);
              }}
            />
            <span
              className=" 
            text-zinc-600 text-[14px] ml-1"
              style={inter.style}
            >
              All
            </span>
          </label>

          <label className="ml-4">
            <input
              type="radio"
              name="filter"
              value="candidates on track"
              className=" w-[12px] h-[12px] accent-pink-500"
              onChange={(event) => {
                setSelectOption(event.target.value);
              }}
            />
            <span
              className=" 
            text-zinc-600 text-[14px] ml-1"
              style={inter.style}
            >
              With candidates on track
            </span>
          </label>

          <label className="ml-4">
            <input
              type="radio"
              name="filter"
              value="Closed"
              className=" w-[12px] h-[12px] accent-pink-500"
              onChange={(event) => {
                setSelectOption(event.target.value);
              }}
            />
            <span
              className=" 
            text-zinc-600 text-[14px] ml-1"
              style={inter.style}
            >
              Closed
            </span>
          </label>

          <p className="text-[20px] my-[20px]" style={montserrat}>
            {jobs.length} jobs posting found
          </p>

          <div id="Accordion" className=" w-[944px] ">
            <Accordion allowToggle>
              {/* rendering list */}
              {jobs &&
                jobs
                  .filter((job) => {
                    return selectOption === ""
                      ? true
                      : selectOption === "Closed"
                      ? job.closed_status === false
                      : selectOption === "candidates on track"
                      ? candidate.filter(
                          (item) =>
                            item.job_following_id === job.id &&
                            item.review_status !== "Decline" &&
                            item.review_status !== "Review finished"
                        ).length > 0
                      : job.category.includes(selectOption);
                  })
                  .map((job) => {
                    return (
                      <AccordionItem className="mt-4 rounded-lg " key={job.id}>
                        <div className="border border-slate-300 shadow-lg shadow-slate-300 rounded-lg bg-white">
                          <div className=" warpper flex relative">
                            <AccordionButton className=" h-[80px] rounded-lg relative ">
                              {/*job title */}
                              <p className=" absolute top-2 text-[20px] font-medium ">
                                {job.title}
                              </p>

                              {/* main-information */}
                              <div
                                id="main-information"
                                className="  absolute flex flex-row top-[50px] left-[10px] ml-[6px] "
                              >
                                <div className="flex flex-row ">
                                  <Image
                                    src="/images/manufactory-pic.svg"
                                    alt="manufactory-pic"
                                    width={12.5}
                                    height={12.5}
                                  />
                                  <p
                                    className=" text-[12px] text-[#616161] ml-[4px] "
                                    key={job.id}
                                  >
                                    {job.category}
                                  </p>
                                </div>
                                <div className="flex flex-row ml-[8px]">
                                  <Image
                                    src="/images/calender-pic.svg"
                                    alt="manufactory-pic"
                                    width={12.5}
                                    height={12.5}
                                  />
                                  <p className="  text-[12px] text-[#616161] ml-[4px]">
                                    {job.type}
                                  </p>
                                </div>
                                <div className="flex flex-row ml-[8px]">
                                  <Image
                                    src="/images/dollar.svg"
                                    alt="manufactory-pic"
                                    width={12.5}
                                    height={12.5}
                                  />
                                  <p className=" text-[12px] font-normal text-[#616161] ml-[4px]">
                                    {job.minRange} - {job.maxRange}
                                  </p>
                                </div>
                              </div>
                              {/* job status*/}

                              {candidate.map((item) => {
                                return (
                                  <>
                                    <div
                                      className="flex flex-row   absolute top-[15px] left-[350px] text-[12px] text-[#616161] "
                                      key={item.id}
                                    >
                                      <div className="flex flex-col justify-center items-center">
                                        <Image
                                          src="/mail-box.svg"
                                          alt="mail-box-pic"
                                          width={12.5}
                                          height={12.5}
                                        />
                                        <p className="font-light ">
                                          open on <br />{" "}
                                          {new Date(
                                            job.update_at
                                          ).toLocaleDateString("en-GB")}
                                        </p>
                                      </div>

                                      <div className="flex flex-col items-center ml-[10px]">
                                        <div className="flex flex-row">
                                          <Image
                                            src="/man-icon-black.svg"
                                            alt="man-icon-pic"
                                            width={12.5}
                                            height={12.5}
                                          />
                                          <p className="font-light  ml-[2px] ">
                                            {candidate.filter(
                                              (item) =>
                                                item.job_following_id === job.id
                                            ).length || 0}
                                          </p>
                                        </div>

                                        <p className="font-light text-[#616161]  ">
                                          Total <br /> Candidates
                                        </p>
                                      </div>
                                      <div className="flex flex-col items-center ml-[10px] text-[#f495b5]">
                                        {job.closed_status && (
                                          <div className="flex flex-row">
                                            <Image
                                              src="/man-icon-pink.svg"
                                              alt="man-icon-pic"
                                              width={12.5}
                                              height={12.5}
                                            />
                                            <p className="ml-[2px] ">
                                              {candidate.filter(
                                                (item) =>
                                                  item.job_following_id ===
                                                    job.id &&
                                                  item.review_status !==
                                                    "Decline" &&
                                                  item.review_status !==
                                                    "Review finished"
                                              ).length || 0}
                                            </p>
                                          </div>
                                        )}
                                        <p className="">
                                          {job.closed_status
                                            ? "Candidates"
                                            : "Closed "}
                                          <br />
                                          {job.closed_status
                                            ? "on track"
                                            : "This"}
                                          <br />
                                          {job.closed_status
                                            ? ""
                                            : " Position Now"}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}

                              {/*button village */}
                              <div>
                                <Link href={`/pages/jobPosting/${job.id}/show`}>
                                  <Image
                                    className="  absolute top-[28px] left-[640px] text-[14px]"
                                    src="/search-line.svg"
                                    alt="search-line-pic"
                                    width={24}
                                    height={24}
                                  />
                                  <p className="  absolute top-[30px] left-[670px] text-[14px]">
                                    Show
                                  </p>
                                </Link>

                                <div>
                                  <Link
                                    href={`/pages/jobPosting/${job.id}/edit`}
                                    className="  absolute top-[22px] left-[860px] text-[14px] py-[8px] px-[16px] bg-[#BF5F82] text-white rounded-full"
                                  >
                                    Edit
                                  </Link>
                                </div>
                              </div>
                            </AccordionButton>
                            <div className="absolute top-[22px] left-[730px] text-[14px]">
                              <button
                                className={`flex flex-row py-[8px] px-[16px] rounded-full ${
                                  job.closed_status === true
                                    ? "bg-[#BF5F82]"
                                    : job.closed_status === false
                                    ? "bg-gray-500"
                                    : job.closed_status === true
                                }`}
                                onClick={(event) => {
                                  event.preventDefault();
                                  toggleStatus(job.id, job.closed_status);
                                }}
                              >
                                <h1>{job.closed_status}</h1>
                                <Image
                                  className=""
                                  src="/x-icon.svg"
                                  alt="x-icon-pic"
                                  width={24}
                                  height={24}
                                />
                                <p className="ml-[5px] text-[14px] text-white ">
                                  {job.closed_status ? "Close" : "Closed"}
                                </p>
                              </button>
                            </div>
                          </div>

                          <AccordionPanel className=" w-[800px] pb={4}">
                            <p className=" py-2 text-[#BF5F82]">
                              About the position
                            </p>
                            <p className="">{job.aboutJob}</p>
                            <p className=" py-2 text-[#BF5F82]">
                              Mandatory Requirements
                            </p>
                            <p className="">{job.mandaturyRequier}</p>
                            <p className=" py-2 text-[#BF5F82]">
                              Optional Requirements
                            </p>
                            <p className="">{job.optionalRequier}</p>
                          </AccordionPanel>
                          <AccordionIcon className="ml-[900px] " />
                        </div>
                      </AccordionItem>
                    );
                  })}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
