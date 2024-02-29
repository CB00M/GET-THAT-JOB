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
  const [application, setApplication] = useState([]);
  const [jobs, setJobs] = useState([]);

  //ดึงemailจากหน้าlogin
  const [userEmail, setUserEmail] = useState("");

  const keepUserDataD = JSON.parse(localStorage.getItem("keepUserData"));
  const email = keepUserDataD?.email || "";

  useEffect(() => {
    if (email) {
      setUserEmail(email);
    }
  }, []);

  //console.log(userEmail); // ตรวจสอบค่า companyEmail ว่าถูกต้องหรือไม่

  //ดึงข้อมูล application

  const fetchApplication = async () => {
    try {
      const { data, error } = await supabase
        .from("your_applications")
        .select("*")
        .eq("email", userEmail);

      if (error) {
        console.error("error", error);
        return;
      }

      setApplication(data);
      //console.log(data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (keepUserDataD) {
      fetchApplication();
    }
  }, [keepUserDataD]);

  //ดึงข้อมูล job
  // console.log(application);

  const fetchJobs = async () => {
    try {
      // ดึง job_following_id ทั้งหมดออกมาจาก application
      const jobFollowingIds = application.map((app) => app.job_following_id);

      // สร้าง Promise สำหรับแต่ละการดึงข้อมูล job โดยใช้ job_following_id
      const jobPromises = jobFollowingIds.map((jobId) =>
        supabase.from("job_posting").select("*").eq("id", jobId).single()
      );

      // รอให้ทุก Promise ดึงข้อมูล job เสร็จสมบูรณ์
      const jobResults = await Promise.all(jobPromises);

      // ตรวจสอบว่าข้อมูล job ที่ดึงมาถูกต้องหรือไม่
      const validJobs = jobResults.filter(
        (result) => !result.error && result.data
      );

      // เก็บข้อมูล job ที่ถูกต้องลงใน state jobs
      setJobs(validJobs.map((result) => result.data));

      //console.log(validJobs.map((result) => result.data));
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (application.length > 0) {
      fetchJobs();
    }
  }, [application]);

  //logout
  const handleLogoutClick = () => {
    handleLogout();
    alert("You have been logged out.");
  };

  return (
    <>
      <div className="w-full h-[900px] bg-neutral-100  items-start inline-flex">
        {/*Sidebar */}
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
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
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

            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
              <img className="w-[24px] h-[24px]" src="/images/following.png" />
              <div
                className="grow shrink basis-0 text-zinc-600 leading-normal"
                style={inter.style}
              >
                Following
              </div>
            </div>
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
              <img className="w-[24px] h-[24px]" src="/images/profile.png" />
              <div
                className="grow text-zinc-600 leading-normal"
                style={inter.style}
              >
                Profile
              </div>
            </div>
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
        {/*your application */}
        <div className=" py-[10px] px-[20px] ml-[150px] ">
          <p
            className=" py-[10px]  text-neutral-700 text-[34px] "
            style={montserrat.style}
          >
            Your applications
          </p>
          {/* <----------------------------------------------------the job title--------------------------------------------------> */}

          <div className="mt-[10px] ">
            <div
              className="text-zinc-600 text-[10px] uppercase relative top-[3px] tracking-[.10em] "
              style={inter.style}
            >
              4 filter your applications
            </div>
            <div
              className="pt-2 inline-flex gap-4 text-zinc-600 text-sm leading-tight tracking-[.01em] "
              style={inter.style}
            >
              <span>
                <input
                  type="radio"
                  id="all"
                  name="filter-your-applications"
                  value="all"
                  className="scale-150 mr-[6px] relative top-[2px] form-radio accent-pink-500 "
                />
                All
              </span>
              <span>
                <input
                  type="radio"
                  id="waiting"
                  name="filter-your-applications"
                  value="waiting"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                />
                Waiting
              </span>
              <span>
                <input
                  type="radio"
                  id="in-progress"
                  name="filter-your-applications"
                  value="in-progress"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                />
                In progress
              </span>
              <span>
                <input
                  type="radio"
                  id="finished"
                  name="filter-your-applications"
                  value="finished"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                />
                Finished
              </span>
              <span>
                <input
                  type="radio"
                  id="declined"
                  name="filter-your-applications"
                  value="declined"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                />
                Declined
              </span>
            </div>
          </div>
          {/* <----------------------------------------------------Filter your candidates--------------------------------------------------> */}
          {/*เริ่มดึงข้อมูล job*/}
          <div>
            <h2
              className="  text-neutral-700 text-[22px] font-medium text-left my-[10px]"
              style={montserrat.style}
            >
              applications found
            </h2>
          </div>
          {/* <----------------------------------------------------candidate boxs--------------------------------------------------> */}
          <div>
            {/*ดึงข้อมูล job*/}

            <Accordion allowToggle>
              {jobs.map((job) => {
                return (
                  <div key={job.id}>
                    {/*Job title*/}
                    <div className="border border-slate-300 shadow-lg shadow-slate-300 rounded-lg bg-white w-[944px]">
                      <AccordionItem
                        className="mt-4 rounded-lg "
                        style={montserrat.style}
                      >
                        <h2>
                          <div className="warpper flex relative">
                            <AccordionButton>
                              <span className="flex flex-row w-[1020px] h-[70px]  ml-[10px]">
                                <div className=" w-[350px] p-2 flex flex-row">
                                  {/*left-container*/}
                                  <Image
                                    src="/logo.png"
                                    width={64}
                                    height={64}
                                  />

                                  <div className="flex flex-col ml-4">
                                    <h2
                                      className="   text-[20px] font-medium text-left"
                                      style={montserrat.style}
                                    >
                                      {job.title}
                                    </h2>

                                    <p className="  text-[#616161] text-[14px] font-medium">
                                      The Company Name SA
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-row  ">
                                  {/* middle-container */}
                                  <div className="text-[#8e8e8e] text-[12px] mr-[150px]">
                                    <div className="flex flex-row justify-start content-end  ">
                                      <div className="flex flex-row ml-1 ">
                                        <Image
                                          src="/factory.svg"
                                          width={15}
                                          height={15}
                                        />
                                        <p className=" py-[10px] text-[#8e8e8e] text-[12px] mx-2">
                                          {job.category}
                                        </p>
                                      </div>
                                      <div className="flex flex-row ml-1">
                                        <Image
                                          src="/calendar-2-line.svg"
                                          width={15}
                                          height={15}
                                        />
                                        <p className=" py-[10px] text-[#8e8e8e] text-[12px] mx-2">
                                          {job.type}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-row   relative bottom-3">
                                      <div className="flex flex-row ml-1 ">
                                        <Image
                                          src="/dollar.svg"
                                          width={15}
                                          height={15}
                                        />
                                        <p className=" py-[10px] text-[#8e8e8e] text-[12px] mx-2">
                                          {job.minRange} - {job.maxRange}
                                        </p>
                                      </div>
                                      <div className="flex flex-row mr-1 ">
                                        <Image
                                          src="/clock.svg"
                                          width={15}
                                          height={15}
                                        />
                                        <p className=" py-[10px] text-[#8e8e8e] text-[12px] mx-2">
                                          Posted 2 days ago
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col justify-center items-center m-2 ">
                                    <Image
                                      src="/mail-line-black.svg"
                                      width={15}
                                      height={15}
                                    />
                                    <p className="text-[12px]">Sent 5 days</p>
                                    <p className="text-[12px]">ago</p>
                                  </div>
                                  <div className="flex flex-col justify-center items-center m-2">
                                    <Image
                                      src="/pause-icon.svg"
                                      width={20}
                                      height={20}
                                    />
                                    <p className="text-[#f495b5] text-[12px]">
                                      Waiting for
                                    </p>
                                    <p className="text-[#f495b5] text-[12px]">
                                      review
                                    </p>
                                  </div>
                                </div>
                              </span>
                            </AccordionButton>
                          </div>
                        </h2>
                        <AccordionPanel
                          className=" w-[800px] pb={4}"
                          style={montserrat.style}
                        >
                          {" "}
                          {/*ดึงข้อมูล application*/}
                          {application
                            .filter((app) => app.job_following_id === job.id)
                            .map((app) => {
                              return (
                                <div key={app.id}>
                                  <h2 className=" py-2 text-[#BF5F82] text-[16px] ml-[10px]">
                                    Professional experience
                                  </h2>
                                  <p className=" py-2 text-[14px] ml-[10px]">
                                    {app.experience}
                                  </p>
                                  <h2 className=" py-2 text-[#BF5F82] text-[16px] ml-[10px]">
                                    Why are you interested in working at the
                                    company name SA
                                  </h2>
                                  <p className=" py-2 text-[14px] ml-[10px]">
                                    {" "}
                                    {app.interesting}
                                  </p>
                                  <div className=" w-[242px] h-[40px] flex relative left-[350px] bottom-[5px] mt-[20px] bg-[#bf5f82] rounded-[22px]">
                                    <Image
                                      src="/x-icon.svg"
                                      width={28}
                                      height={20}
                                      className="absolute left-[14px] top-[6px]"
                                    />
                                    <button className="  text-white absolute   text-[14px]  left-[50px] top-[10px]   uppercase ">
                                      decline application
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          {/*จบข้อมูล application*/}
                        </AccordionPanel>

                        <AccordionIcon className="ml-[900px] " />
                      </AccordionItem>
                    </div>
                  </div>
                );
              })}
            </Accordion>
          </div>
          {/*จบดึงข้อมูล job*/}
        </div>
      </div>
    </>
  );
}
