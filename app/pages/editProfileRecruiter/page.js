"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Textarea } from "@chakra-ui/react";
import "../../globals.css";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  return (
    <>
      <div className="w-full h-[900px] bg-neutral-100  items-start inline-flex">
        {/*nav bar */}
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
              className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex"
            >
              <Image src="/images/job-posting-pic.svg" width={22} height={22} />
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
        {/* main */}
        <div className="w-[1000px] h-[900px] py-[10px] px-[20px] ml-[150px] border border-black">
          {/* Profile */}
          <p
            className=" py-[10px]  text-neutral-700 text-[34px] "
            style={montserrat.style}
          >
            Profile
          </p>
          {/* Company logo */}
          <div>
            <div>
              <img />
            </div>
            <div>
              <p
                className=" pt-[10px]
              text-[10px] "
                style={inter.style}
              >
                COMPANY LOCO
              </p>
              <div className="relative">
                <Image
                  src="/images/uplode-icon.svg"
                  width={20}
                  height={20}
                  alt="arrow"
                  className="absolute left-[15px] top-[8px]"
                />
                <input type="file" name="CV" className="customfile text-sm  " />
              </div>
              <p>PNG, JPEG, IMG</p>
            </div>
            {/* company email */}
            <p
              className=" pt-[10px]
              text-[10px]"
              style={inter.style}
            >
              COMPANY EMAIL
            </p>
            <input
              name="COMPANY EMAIL"
              className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
              type="text"
              placeholder=""
            />

            {/* company name */}
            <p
              className=" pt-[10px]
              text-[10px]"
              style={inter.style}
            >
              COMPANY NAME
            </p>
            <input
              name="COMPANY EMAIL"
              className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
              type="text"
              placeholder=""
            />
            {/* company website */}
            <p
              className=" pt-[10px]
              text-[10px]"
              style={inter.style}
            >
              COMPANY WEBSITE
            </p>
            <input
              name="COMPANY EMAIL"
              className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
              type="text"
              placeholder=""
            />
            {/* about the company */}
            <p
              className=" pt-[10px]
             text-[10px]"
              style={inter.style}
            >
              {" "}
              ABOUT THE COMPANY{" "}
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
                  borderColor: "black",
                  boxShadow: "none",
                },
              }}
              placeholder=""
              name="about-company"
            />
            {/* update button */}
            <br />
            <button className="border-2 border-[#F48FB1] text-white rounded-2xl bg-[#F48FB1] mt-5 mb-5 py-1 px-3 ">
              UPDATE PROFILE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
