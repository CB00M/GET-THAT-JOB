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
import { applyJobData } from "../../api/action";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function ApplyPage({ params }) {
  const router = useRouter();
  const supabase = createClient();
  const [job, setJob] = useState([]);
  const [professionalProfile, setProfessionalProfile] = useState([]);
  const [uploadCV, setUploadCV] = useState(false);

  async function getDetailJob() {
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
  }, [params.id]);

  return (
    <div className="w-full h-[1050px] bg-neutral-100  items-start inline-flex">
      <Sidebar />

      {/*Job Details */}
      <div className="w-[1200px] h-[800px] py-[10px] px-[20px] ml-[100px]">
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
        <article className="mt-5">
          <form action={applyJobData}>
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
                    className="relative left-[60px]"
                  ></Image>
                </button>
              </div>
            </header>
            <h1 className="text-center text-[48px] text-[#373737] relative left-[60px]">
              {job.title}
            </h1>
            <p className="flex items-center gap-1 text-[10px] justify-center py-[2px] tracking-widest text-[#616161] relative left-[60px]">
              <Image
                src="/images/clock.svg"
                alt="day"
                width={15}
                height={15}
              ></Image>
              POSTED 2 DAYS AGO
            </p>
            <div className="flex justify-center items-center gap-7 my-3 relative left-[60px]">
              <div className="h-[77px] w-[281px] border border-[#BF5F82] flex flex-col justify-center items-center rounded-lg  p-2 bg-white drop-shadow-lg">
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
                        value="all"
                        className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                        onClick={() => {
                          setUploadCV(false);
                        }}
                      />
                      Use current CV
                    </span>
                    <span>
                      <input
                        type="radio"
                        id="waiting"
                        name="filter-your-candidates"
                        value="waiting"
                        className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                        onClick={() => {
                          setUploadCV(true);
                        }}
                      />
                      Upload new CV
                    </span>
                  </div>
                </div>
                {/* Upload CV Button */}
                {uploadCV && (
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
                )}
                <div className="text-[#373737] text-[10px] pt-[20px] tracking-widest font-medium">
                  <p
                    className="font-medium mb-[-15px] text-[#373737]"
                    style={inter.style}
                  >
                    PROFESSIONAL EXPERIENCE (TAKEN FROM YOUR PROFILE)
                  </p>
                  <br />
                  <textarea
                    className="w-[760px] h-[272px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
                    style={inter.style}
                    type="text"
                    id="experience"
                    name="experience"
                    placeholder="..."
                  />
                </div>
                <div className="text-[#373737] text-[10px] pt-[20px] tracking-widest">
                  <p
                    className="font-medium mb-[-15px] text-[#373737]"
                    style={inter.style}
                  >
                    WHY ARE YOU INTERESTED IN WORKING AT THE COMPANY NAME SA
                  </p>
                  <br />
                  <textarea
                    className="w-[760px] h-[112px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
                    style={inter.style}
                    type="text"
                    id="experience"
                    name="interest-working"
                    placeholder="Mention things about The Company Name SA that excite you. Why would you be a good candidate?"
                  />
                  <p
                    className="text-[12px] text-[#8E8E8E] "
                    style={inter.style}
                  >
                    Between 50 and 1000 characters
                  </p>
                </div>
              </div>
              <button className="mt-3 m-auto relative relative left-[60px]">
                <Image
                  src="/images/send.svg"
                  alt="send application"
                  width={233}
                  height={56}
                ></Image>
              </button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
}
