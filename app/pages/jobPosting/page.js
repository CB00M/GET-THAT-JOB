"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import RecruiterButton from "../../components/RecruiterButton/RecruiterButton.jsx";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  const supabase = createClient();
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    let { data, error } = await supabase.from("job_posting").select("*");

    if (error || !data) {
      console.log("error", error);
    }
    console.log(data);
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <div
        className="w-full h-[900px] bg-neutral-100 items-start inline-flex "
        style={inter.style}
      >
        <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start flex">
            <div className="px-4 pb-[32px] flex-col justify-center items-start flex">
              <Image
                src="/images/gtj-logo.png"
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
        {/*Main*/}
        <div className="w-[1000px] h-[800px] py-[10px] px-[20px] ml-[150px] border border-black">
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
              name="all"
              value="all"
              className=" w-[12px] h-[12px]"
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
              name="candidates on track"
              value="candidates on track"
              className=" w-[12px] h-[12px]"
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
              name="Closed"
              value="Closed"
              className=" w-[12px] h-[12px]"
            />
            <span
              className=" 
            text-zinc-600 text-[14px] ml-1"
              style={inter.style}
            >
              Closed
            </span>
          </label>

          <div id="Accordion" className=" w-[944px] ">
            <Accordion allowToggle>
              {/* rendering list */}
              {jobs.map((job) => {
                return (
                  <AccordionItem className="mt-4 rounded-lg " key={job.id}>
                    <div className="border border-black rounded-lg bg-white">
                      <AccordionButton className=" h-[80px] rounded-lg relative">
                        {/*job title */}
                        <p className=" absolute top-2 text-[20px] font-medium ">
                          {job.title}
                        </p>
                        <h1>{job.id}</h1>
                        <RecruiterButton id={job.id} />
                        {/* main-information */}
                        <div
                          id="main-information"
                          className="  absolute flex flex-row top-[50px] left-[10px] ml-[6px]"
                        >
                          <div className="flex flex-row">
                            <Image
                              src="/images/manufactory-pic.svg"
                              alt="manufactory-pic"
                              width={12.5}
                              height={12.5}
                            />
                            <p className=" text-[12px] text-[#616161] ml-[4px] ">
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
                            <p className="   text-[12px] text-[#616161] ml-[4px]">
                              {job.minRange} - {job.maxRange}
                            </p>
                          </div>
                        </div>
                        {/* job status*/}
                        <div className="flex flex-row   absolute top-[15px] left-[400px] text-[12px] text-[#616161]">
                          <div className="flex flex-col justify-center items-center">
                            <Image
                              src="/images/manufactory-pic.svg"
                              alt="manufactory-pic"
                              width={12.5}
                              height={12.5}
                            />
                            <p className="">
                              open on <br /> 07/11/20
                            </p>
                          </div>
                          <div className="flex flex-col items-center ml-[10px]">
                            <div className="flex flex-row">
                              <Image
                                src="/images/manufactory-pic.svg"
                                alt="manufactory-pic"
                                width={12.5}
                                height={12.5}
                              />
                              <p className=" ml-[2px] ">5</p>
                            </div>
                            <p className="  ">
                              Total <br /> Candidates
                            </p>
                          </div>
                          <div className="flex flex-col items-center ml-[10px] text-[#BF5F82]">
                            <div className="flex flex-row  ">
                              <Image
                                src="/images/manufactory-pic.svg"
                                alt="manufactory-pic"
                                width={12.5}
                                height={12.5}
                              />
                              <p className=" ml-[2px] ">3</p>
                            </div>
                            <p className="  ">
                              Candidates
                              <br />
                              on track
                            </p>
                          </div>
                        </div>
                        {/*button village */}
                        <div>
                          <div>
                            <Image
                              className="  absolute top-[35px] left-[685px] text-[14px]"
                              src="/images/manufactory-pic.svg"
                              alt="manufactory-pic"
                              width={12.5}
                              height={12.5}
                            />

                            <p className="  absolute top-[30px] left-[700px] text-[14px]">
                              Show
                            </p>
                          </div>
                          <div className="  absolute top-[22px] left-[750px] text-[14px]">
                            <div className="flex flex-row py-[8px] px-[16px]  bg-[#BF5F82] rounded-full ">
                              <Image
                                className="  "
                                src="/images/manufactory-pic.svg"
                                alt="manufactory-pic"
                                width={12.5}
                                height={12.5}
                              />
                              <p className="  ml-[5px] text-[14px] text-white ">
                                Closed
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="  absolute top-[22px] left-[860px] text-[14px] py-[8px] px-[16px] bg-[#BF5F82] text-white rounded-full">
                              Edite
                            </p>
                          </div>
                        </div>
                      </AccordionButton>

                      <AccordionPanel pb={4} className=" w-[800px]">
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
