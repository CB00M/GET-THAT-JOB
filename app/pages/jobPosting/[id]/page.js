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
      .eq("id", params.id);

    if (error || !data) {
      console.log("error", error);
    }
    console.log("checked: ", data);
    setJobs(data);
  };

  const fetchCandidate = async () => {
    let { data, error } = await supabase.from("job_posting").select("*");

    if (error || !data) {
      console.log("error", error);
    }

    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, [params.id]);

  const handleFilterChange = (event) => {
    let result = event.target.value;
    setSelectedFilter(event.target.value);
  };
  console.log(selectedFilter);

  return (
    <>
      <div className="w-full h-[900px] bg-neutral-100  items-start inline-flex">
        <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start flex">
            <div className="px-4 pb-[32px] flex-col justify-center items-start flex">
              <Image src="/images/gtj-logo.png" width={136} height={40} />
            </div>
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
              <Image src="/bag.png" width={24} height={24} />
              <div
                className="grow text-zinc-600 leading-normal"
                style={inter.style}
              >
                Job Posting
              </div>
            </div>
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
              <Image src="/add-file.png" width={24} height={24} />
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

        <div className=" py-[10px] px-[20px] ml-[150px] ">
          <div className="flex">
            <Image src="/arrow-left-grey.png" width={24} height={24} />
            <Link
              className="font-medium text-[#616161]"
              href={"/pages/jobPostings"}
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
                    className="border border-slate-300 shadow-lg shadow-slate-400  rounded-[10px] w-[1080px]  p-5"
                  >
                    <AccordionItem w="1050px">
                      <h2>
                        <div className="warpper flex relative">
                          <AccordionButton>
                            <span className="flex flex-row w-[1020px] h-[70px] mb-3">
                              <div className=" w-[420px] p-2">
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
                                      Manufactoring
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
                                      Full time
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
                                      2.0k - 2.5k
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-row">
                                {/* middle-container */}
                                <div className="flex flex-col justify-center items-center m-2">
                                  <Image
                                    src="/mail-box.svg"
                                    width={20}
                                    height={20}
                                  />
                                  <p>Open on</p>
                                  <p>07/11/20</p>
                                </div>

                                <div className="flex flex-col justify-center items-center m-2">
                                  <div className="flex ">
                                    <Image
                                      src="/man-icon-black.svg"
                                      width={20}
                                      height={20}
                                    />
                                    <p className="ml-1">5</p>
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
                                    <p className="text-[#f495b5] ml-1">3</p>
                                  </div>
                                  <p className="text-[#f495b5]">Candidates</p>
                                  <p className="text-[#f495b5]">on track</p>
                                </div>
                              </div>
                              <div className="flex flex-row justify-center items-center ml-[50px]">
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
                          <button className="m-5  w-[113px] h-10 bg-[#bf5f82] text-white  rounded-2xl text-[16px] text-right px-[20px] absolute right-[50px] bottom-[5px]">
                            CLOSE
                            <Image
                              src="/x-icon.svg"
                              width={23}
                              height={23}
                              alt="arrow"
                              className="absolute left-[15px] bottom-[8px] "
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
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                        <h2 className="  text-[#c67190] text-[20px] font-medium text-left my-2">
                          Mandatory Requirements
                        </h2>
                        <p>-Lorem ipsum dolor sit amet, consectetur</p>
                        <p>-Lorem ipsum dolor sit amet, consectetur</p>
                        <p>-Lorem ipsum dolor sit amet, consectetur</p>
                        <p>-Lorem ipsum dolor sit amet, consectetur</p>
                        <h2 className="  text-[#c67190] text-[20px] font-medium text-left my-2">
                          Optional Requirements
                        </h2>
                        <p>-Lorem ipsum dolor sit amet, consectetur</p>
                        <p>-Lorem ipsum dolor sit amet, consectetur</p>
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
              5 candidates found
            </h2>
          </div>
          {/* <----------------------------------------------------candidate boxs--------------------------------------------------> */}
          <div>
            <Accordion allowToggle>
              {/*Job title*/}
              <div className="border border-slate-300 shadow-lg shadow-slate-400  rounded-[10px] w-[1080px]  p-5">
                <AccordionItem w="1050px">
                  <h2>
                    <div className="warpper flex relative">
                      <AccordionButton>
                        <span className="flex flex-row w-[1020px] h-[70px] mb-3">
                          <div className=" w-[350px] p-2">
                            {/*left-container*/}
                            <h2
                              className="  text-neutral-700 text-[22px] font-medium text-left"
                              style={montserrat.style}
                            >
                              Guybrush Threepwood
                            </h2>
                            <div className="flex flex-row">
                              <div className="flex flex-row mr-1">
                                <Image
                                  src="/linkedin-box.svg"
                                  width={20}
                                  height={20}
                                  className="m-2"
                                />
                                <p className=" py-[10px] text-[#8e8e8e] text-[12px]">
                                  -
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row ">
                            {/* middle-container */}
                            <div className="flex flex-col justify-center items-start m-2 text-[#8e8e8e] text-[12px] mr-[70px]">
                              <div className="flex">
                                <Image
                                  src="/mail-line.svg"
                                  width={20}
                                  height={20}
                                  className="mr-1"
                                />
                                <a>guy.brush@mail.com</a>
                              </div>
                              <div className="flex">
                                <Image
                                  src="/phone-line.svg"
                                  width={20}
                                  height={20}
                                  className="mr-1"
                                />
                                <a>+191</a>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-center m-2 ">
                              <Image
                                src="/mail-line-black.svg"
                                width={20}
                                height={20}
                              />
                              <p>Sent 5 days</p>
                              <p>ago</p>
                            </div>
                            <div className="flex flex-col justify-center items-center m-2">
                              <Image
                                src="/pause-icon.svg"
                                width={20}
                                height={20}
                              />
                              <p className="text-[#f495b5]">Waiting for</p>
                              <p className="text-[#f495b5]">review</p>
                            </div>
                          </div>
                        </span>
                        <AccordionIcon />
                      </AccordionButton>
                      <button className="m-5  w-[180px] h-[40px] border-[1px] border-[#f495b5]   rounded-2xl text-[16px] text-right px-[20px] absolute right-[20px] bottom-[5px] uppercase">
                        mark as started
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
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h2 className="  text-[#c67190] text-[20px] font-medium text-left my-2">
                      Mandatory Requirements
                    </h2>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <div className="flex relative left-[400px] bottom-[5px] mt-[20px]">
                      <Image
                        src="/download-icon.svg"
                        width={20}
                        height={20}
                        className="absolute left-[10px] top-[10px]"
                      />
                      <button className=" w-[180px] h-[40px] border-[1px] border-[#f495b5]   rounded-2xl text-[16px] text-right pr-[15px]  uppercase ">
                        download cv
                      </button>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
