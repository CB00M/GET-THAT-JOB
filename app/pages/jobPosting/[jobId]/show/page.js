"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import Link from "next/link.js";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { createClient } from "@/utils/supabase/client.js";
import { handleLogout } from "@/app/login/actions";
import { data } from "autoprefixer";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page({ params }) {
  const supabase = createClient();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  //   console.log("checkparams :", params); เช็คข้อมูลของ params

  const fetchJobs = async () => {
    let { data, error } = await supabase
      .from("job_posting")
      .select("*")
      .eq("id", params.jobId);

    if (error || !data) {
      console.log("error", error);
    }
    console.log("checked data job: ", data);
    setJobs(data);
  };

  // หาเฉพาะคนที่สมัครมา
  const fetchCandidate = async () => {
    let { data, error } = await supabase
      .from("your_applications")
      .select("*")
      .eq("job_following_id", params.jobId); //หา data ของงานที่ ผู้สมัครเลือก

    if (error || !data) {
      console.log("error", error);
    }
    console.log("checked data candidate: ", data);
    setCandidates(data);
  };

  useEffect(() => {
    fetchJobs();
    fetchCandidate();
  }, [params.jobId]);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  //toggle
  const toggleStatus = async (candidateId, currentStatus) => {
    try {
      // พังก์ชันสลับสถานะ
      if (currentStatus === "Waiting for review") {
        // อัปเดตข้อมูลในฐานข้อมูล
        const { data } = await supabase
          .from("your_applications")
          .update({ review_status: "Review in progress" })
          .eq("id", candidateId);
        fetchCandidate();
        console.log("status1", data);
      } else if (currentStatus === "Review in progress") {
        const { data } = await supabase
          .from("your_applications")
          .update({ review_status: "Review finished" })
          .eq("id", candidateId);
        fetchCandidate();
        console.log("status2", data);
      } else if (currentStatus === "Review finished") {
        const { data } = await supabase
          .from("your_applications")
          .update({ review_status: "Waiting for review" })
          .eq("id", candidateId);
        fetchCandidate();
        console.log("status3", data);
      } else if (currentStatus === "Decline") {
        const { data } = await supabase
          .from("your_applications")
          .update({ review_status: "Decline" })
          .eq("id", candidateId);
        fetchCandidate();
        console.log("status4", data);
      }

      // แสดงข้อผิดพลาดถ้ามี
    } catch (error) {
      console.error("Error toggling job status:", error.message);
    }
  };

  //toggle
  const toggleClose = async (jobId, currentStatus) => {
    try {
      // พังก์ชันสลับสถานะ
      const newStatus = !currentStatus;

      // อัปเดตข้อมูลในฐานข้อมูล
      const { error } = await supabase
        .from("job_posting")
        .update({ closed_status: newStatus })
        .eq("id", jobId);

      if (error) {
        throw error;
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

  //ออกจากระบบ
  const handleLogoutClick = () => {
    handleLogout();
    alert("You have been logged out.");
  };

  const handleDownloadCv = (id) => {};

  console.log(selectedFilter);
  console.log("data candidate:", candidates);
  console.log("job data :", jobs);

  return (
    <>
      <div className="w-full h-[900px] bg-neutral-100  items-start inline-flex">
        <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start flex">
            <div className="px-4 pb-[32px] flex-col justify-center items-start flex">
              <Image
                src="/images/get-that-job-logo.svg"
                width={136}
                height={40}
              />
            </div>
            <Link
              href={`/pages/jobPosting`}
              className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex"
            >
              <Image src="/images/job-posting-pic.svg" width={24} height={24} />
              <div
                className="grow text-zinc-600 leading-normal"
                style={inter.style}
              >
                Job Posting
              </div>
            </Link>
            <Link
              href={`/pages/createNewJobPosting`}
              className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex"
            >
              <Image src="/add-file.png" width={24} height={24} />
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
        {/*ping */}

        <div className=" py-[10px] px-[20px] ml-[150px] ">
          <div className="flex">
            <Image src="/arrow-left-grey.png" width={24} height={24} />
            <Link
              className="font-medium text-[#616161]"
              href={"/pages/jobPosting"}
            >
              Back
            </Link>
          </div>
          <p
            className=" py-[10px]  text-neutral-700 text-[34px] font-medium"
            style={montserrat.style}
          >
            Show Job Posting
          </p>

          {/* <----------------------------------------------------the job title--------------------------------------------------> */}
          <div className="chakra">
            <Accordion allowToggle>
              {/*Job title*/}
              {jobs.map((job) => {
                return (
                  <div
                    key={job.id}
                    className="border border-slate-300 shadow-lg shadow-slate-400  rounded-[10px] w-[950px]  "
                  >
                    <AccordionItem className=" rounded-lg border-none ">
                      <h2>
                        <div className=" warpper flex relative">
                          <AccordionButton>
                            <span className="flex flex-row w-[1020px] h-[70px] mb-3">
                              <div className=" w-[360px] p-2 ">
                                {/*left-container*/}
                                <h2
                                  className="  text-neutral-700 text-[22px] font-medium text-left"
                                  style={montserrat.style}
                                >
                                  {job.title}
                                </h2>
                                <div className="flex flex-row">
                                  <div className="flex flex-row mr-1">
                                    <Image
                                      src="/factory.svg"
                                      width={15}
                                      height={20}
                                      className="m-2"
                                    />
                                    <p className=" py-[10px] text-[#8e8e8e] text-[12px]">
                                      {job.category}
                                    </p>
                                  </div>
                                  <div className="flex flex-row mr-1">
                                    <Image
                                      src="/calendar-2-line.svg"
                                      width={15}
                                      height={20}
                                      className="m-2"
                                    />
                                    <p className=" py-[10px] text-[#8e8e8e] text-[12px]">
                                      {job.type}
                                    </p>
                                  </div>
                                  <div className="flex flex-row ">
                                    <Image
                                      src="/dollar.svg"
                                      width={15}
                                      height={20}
                                      className="m-2"
                                    />
                                    <p className=" py-[10px] text-[#8e8e8e] text-[12px]">
                                      {job.minRange} - {job.maxRange}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-row ">
                                {/* middle-container */}
                                <div className="flex flex-col justify-center items-center m-2">
                                  <Image
                                    src="/mail-box.svg"
                                    width={20}
                                    height={20}
                                  />

                                  <p>
                                    open on <br />{" "}
                                    {new Date(job.update_at).toLocaleDateString(
                                      "en-GB"
                                    )}
                                  </p>
                                </div>

                                <div className="flex flex-col justify-center items-center m-2">
                                  <div className="flex ">
                                    <Image
                                      src="/man-icon-black.svg"
                                      width={20}
                                      height={20}
                                    />
                                    <p className="ml-1">{candidates.length}</p>
                                  </div>
                                  <p>Total</p>
                                  <p>Candidates</p>
                                </div>
                                <div className="flex flex-col justify-center items-center m-2">
                                  <div className="flex">
                                    <Image
                                      src="/man-icon-pink.svg"
                                      width={20}
                                      height={20}
                                    />
                                    <p className="text-[#f495b5] ml-1">
                                      {
                                        candidates.filter(
                                          (data) =>
                                            data.review_status !== "Decline"
                                        ).length
                                      }
                                    </p>
                                  </div>
                                  <p className="text-[#f495b5]">Candidates</p>
                                  <p className="text-[#f495b5]">on track</p>
                                </div>
                              </div>
                              <div className="flex flex-row justify-center items-center ml-[10px]">
                                {/* showjob-container */}
                                <Image
                                  src="/search-line.svg"
                                  width={25}
                                  height={20}
                                  className="m-2"
                                />
                                <p>SHOW</p>
                              </div>
                            </span>
                            <AccordionIcon />
                          </AccordionButton>
                          <button
                            className={`m-5  w-[113px] h-10 bg-[#bf5f82] hover:bg-pink-700 text-white  rounded-2xl text-[16px] text-right px-[20px] absolute right-[50px] bottom-[15px]
                          ${
                            job.closed_status === true
                              ? "bg-[#BF5F82]"
                              : job.closed_status === false
                              ? "bg-gray-500"
                              : job.closed_status === true
                          }`}
                            onClick={(event) => {
                              event.preventDefault();
                              toggleClose(job.id, job.closed_status);
                            }}
                          >
                            {job.closed_status ? "Close" : "Closed"}
                            <Image
                              src="/x-icon.svg"
                              width={23}
                              height={23}
                              alt="arrow"
                              className="absolute left-[15px] bottom-[8px]"
                            />
                          </button>
                        </div>
                      </h2>
                      <AccordionPanel
                        pb={4}
                        style={montserrat.style}
                        className="font-medium"
                      >
                        {" "}
                        <h2 className="  text-[#c67190] text-[20px] font-medium text-left my-2">
                          About the job position
                        </h2>
                        <p>{job.aboutJob}</p>
                        <h2 className="  text-[#c67190] text-[20px] font-medium text-left my-2">
                          Mandatory Requirements
                        </h2>
                        <p>{job.mandaturyRequier}</p>
                        <h2 className="  text-[#c67190] text-[20px] font-medium text-left my-2">
                          Optional Requirements
                        </h2>
                        <p>{job.optionalRequier}</p>
                      </AccordionPanel>
                    </AccordionItem>
                  </div>
                );
              })}
            </Accordion>
          </div>
          <div className="mt-[30px] ">
            <div
              className="text-zinc-600 text-[10px] uppercase relative top-[3px] tracking-[.10em] "
              style={inter.style}
            >
              filter your candidates
            </div>
            <div
              className="pt-2 inline-flex gap-4 text-zinc-600 text-sm leading-tight tracking-[.01em] "
              style={inter.style}
            >
              <span>
                <input
                  type="radio"
                  id="all"
                  name="filter-your-candidates"
                  value="all"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                  checked={selectedFilter === "all"}
                  onChange={handleFilterChange}
                />
                All
              </span>
              <span>
                <input
                  type="radio"
                  id="waiting"
                  name="filter-your-candidates"
                  value="waiting"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                  checked={selectedFilter === "waiting"}
                  onChange={handleFilterChange}
                />
                Waiting
              </span>
              <span>
                <input
                  type="radio"
                  id="in-progress"
                  name="filter-your-candidates"
                  value="in-progress"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                  checked={selectedFilter === "in-progress"}
                  onChange={handleFilterChange}
                />
                In progress
              </span>
              <span>
                <input
                  type="radio"
                  id="finished"
                  name="filter-your-candidates"
                  value="finished"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                  checked={selectedFilter === "finished"}
                  onChange={handleFilterChange}
                />
                Finished
              </span>
            </div>
          </div>
          {/* <----------------------------------------------------Filter your candidates--------------------------------------------------> */}
          <div>
            <h2
              className="  text-neutral-700 text-[22px] font-medium text-left mt-[30px] mb-[10px]"
              style={montserrat.style}
            >
              {candidates.length} candidates found
            </h2>
          </div>
          {/* <----------------------------------------------------candidate boxs--------------------------------------------------> */}
          <div>
            <Accordion allowToggle>
              {/*Job title*/}
              {candidates &&
                candidates
                  .filter((job) => {
                    return selectedFilter === "all"
                      ? true
                      : selectedFilter === "waiting"
                      ? job.review_status === "Waiting for review"
                      : selectedFilter === "in-progress"
                      ? job.review_status === "Review in progress"
                      : selectedFilter === "finished"
                      ? job.review_status === "Review finished"
                      : null;
                  })
                  .map((data) => {
                    return (
                      <div
                        key={data.id}
                        className="border border-slate-300 shadow-lg shadow-slate-400  rounded-[10px] w-[950px]  mb-6"
                      >
                        <AccordionItem className="rounded-lg border-none ">
                          <h2>
                            <div className="warpper flex relative">
                              <AccordionButton>
                                <span className="flex flex-row w-[1020px] h-[70px] mb-3 ">
                                  <div className=" w-[250px] p-2 ">
                                    {/*left-container*/}
                                    <h2
                                      className="  text-neutral-700 text-[22px] font-medium text-left"
                                      style={montserrat.style}
                                    >
                                      {data.name}
                                    </h2>
                                    <div className="flex flex-row">
                                      <div className="flex flex-row mr-1">
                                        <Image
                                          src="/linkedin-box.svg"
                                          width={15}
                                          height={15}
                                          className="m-1"
                                        />
                                        <p className=" text-[#8e8e8e] text-[12px] w-[200px] text-left">
                                          {data.linkedin}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-row ">
                                    {/* middle-container */}
                                    <div className="flex flex-col justify-center items-start m-2 text-[#8e8e8e] text-[12px] w-[230px] ">
                                      <div className="flex mb-1">
                                        <Image
                                          src="/mail-line.svg"
                                          width={20}
                                          height={20}
                                          className="mr-1"
                                        />
                                        <p className="text-[#8e8e8e] text-[12px] w-[200px] text-left">
                                          {data.email}
                                        </p>
                                      </div>
                                      <div className="flex">
                                        <Image
                                          src="/phone-line.svg"
                                          width={20}
                                          height={20}
                                          className="mr-1"
                                        />
                                        <a>{data.phonenumber}</a>
                                      </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center m-2 ">
                                      <Image
                                        src="/mail-line-black.svg"
                                        width={20}
                                        height={20}
                                      />
                                      <p>Sent</p>
                                      <p>
                                        {new Date(
                                          data.timestampt
                                        ).toLocaleDateString("en-GB")}
                                      </p>
                                    </div>
                                    <div className="flex flex-col justify-center items-center m-2">
                                      <Image
                                        src="/pause-icon.svg"
                                        width={20}
                                        height={20}
                                      />

                                      <p className="text-[#f495b5] w-[80px]">
                                        {data.review_status}
                                      </p>
                                    </div>
                                  </div>
                                </span>
                                <AccordionIcon />
                              </AccordionButton>
                              <button
                                className={`hover:bg-slate-200 m-5  h-[40px] border-[1px] font-normal rounded-2xl text-[16px] text-right px-[20px] absolute right-[20px] bottom-[15px] uppercase ${
                                  data.review_status === "Waiting for review"
                                    ? "border-[#f495b5] "
                                    : data.review_status ===
                                      "Review in progress"
                                    ? "border-[#f495b5] "
                                    : data.review_status === "Review finished"
                                    ? "bg-gray-300 text-slate-500"
                                    : data.review_status === "Decline"
                                    ? "bg-gray-300 text-slate-500"
                                    : ""
                                }`}
                                onClick={(event) => {
                                  event.preventDefault();
                                  toggleStatus(data.id, data.review_status);
                                }}
                              >
                                {data.review_status === "Waiting for review" &&
                                  "MARK AS STARTED"}
                                {data.review_status === "Review in progress" &&
                                  "MARK AS FINISHED"}
                                {data.review_status === "Review finished" &&
                                  "FINISHED"}
                                {data.review_status === "Decline" && "Decline"}
                              </button>
                            </div>
                          </h2>
                          <AccordionPanel
                            pb={4}
                            style={montserrat.style}
                            className="font-medium"
                          >
                            {" "}
                            <h2 className="  text-[#c67190] text-[20px] font-medium text-left my-2">
                              Professional experience
                            </h2>
                            <p>{data.experience}</p>
                            <h2 className="  text-[#c67190] text-[20px] font-medium text-left my-2">
                              Why are you interested in working at The company
                              name SA
                            </h2>
                            <p>{data.interesting}</p>
                            <div className="flex relative left-[350px] bottom-[5px] mt-[20px]">
                              <Image
                                src="/download-icon.svg"
                                width={20}
                                height={20}
                                className="absolute left-[10px] top-[10px]"
                              />
                              <button
                                className=" w-[180px] h-[40px] border-[1px] border-[#f495b5]   rounded-2xl text-[16px] text-right pr-[15px]  uppercase "
                                onClick={() => {
                                  window.open(data.file_cv);
                                }}
                              >
                                download cv
                              </button>
                            </div>
                          </AccordionPanel>
                        </AccordionItem>
                      </div>
                    );
                  })}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
