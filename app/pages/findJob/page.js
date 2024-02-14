"use client";
import React, { useState, useEffect } from "react";
import { Montserrat, Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import Sidebar from "@/app/components/ProfessionalSidebar/page";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { create } from "domain";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  const supabase = createClient();
  const [findJobs, setFindJobs] = useState([]);
  const fetchFindJobs = async () => {
    let { data, error } = await supabase.from("job_posting").select("*");

    if (error || !data) {
      console.log("error:", error);
    }
    setFindJobs(data);
  };

  useEffect(() => {
    fetchFindJobs();
  }, []);
  return (
    <>
      <div className="w-full h-[1050px] bg-neutral-100  items-start inline-flex">
        <Sidebar />

        {/*Find that job */}
        <div className="w-[1200px] h-[800px] py-[10px] px-[20px] ml-[150px] ">
          <p
            className=" py-[10px]  text-neutral-700 text-[34px] "
            style={montserrat.style}
          >
            Find that job
          </p>

          <p
            className=" pt-[10px]
             text-zinc-600 text-[10px] "
            style={inter.style}
          >
            search by job title or company name
          </p>
          <input
            name="title"
            className="w-[389px] h-9 rounded-lg text-neutral-400  border-2 border-[#F48FB1] pl-2  "
            type="text"
            placeholder="manufacturing, sales, swim"
          />
          <div className="flex gap-4">
            <div>
              <p
                className=" pt-[10px]
            text-zinc-600 text-[10px]"
                style={inter.style}
              >
                CATEGORY
              </p>

              <select
                name="category"
                className="w-[250px] h-9 rounded-lg text-neutral-400  border-2 border-[#F48FB1] pl-2 "
              >
                <option value="">Select a category</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="legal">Legal</option>
                <option value="education">Education</option>
                <option value="government">Government</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div>
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
                  className="w-[250px] h-9 rounded-lg text-neutral-400  border-2 border-[#F48FB1] pl-2 "
                >
                  <option value="">Select a type</option>
                  <option value="Full time">Full time</option>
                  <option value="Part time">Part time</option>
                </select>
              </label>
            </div>
            <div>
              <p
                className=" pt-[10px] text-zinc-600 text-[10px]"
                style={inter.style}
              >
                SALARY RANGE
              </p>

              <div className="relative mt-[-10px]">
                <Image
                  className="  absolute top-4 left-[13px]"
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
                />
                <span className="text-[30px] text-neutral-400">- </span>
                <input
                  className="w-[100px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-11 "
                  type="text"
                  name="maxRange"
                  placeholder="max"
                />
              </div>
            </div>
          </div>
          <p style={montserrat.style} className="font-medium mt-3 text-xl">
            {findJobs.length} jobs for you
          </p>
          <div className="flex flex-wrap gap-5 mt-3">
            {/* Show job cards */}

            {findJobs.map((item, index) => {
              return (
                <div className="w-72 h-44 border rounded-lg bg-white">
                  <div className="mt-4 flex gap-2 justify-center items-center">
                    <div>
                      <Image
                        src="/images/logo-web/Web-logo.svg"
                        width={74}
                        height={74}
                      ></Image>
                    </div>
                    <div>
                      <p className="text-neutral-400 text-[12px] flex gap-1 items-center">
                        <Image
                          src="/images/logo-web/Group.svg"
                          width={11}
                          height={11}
                        ></Image>
                        {item.category}
                      </p>
                      <p
                        style={montserrat.style}
                        className="text-xl font-medium"
                      >
                        {item.title}
                      </p>
                      <p
                        style={montserrat.style}
                        className="font-medium text-sm"
                      >
                        The Company Name
                      </p>
                      <div className="flex gap-3 text-neutral-400">
                        <p
                          style={inter.style}
                          className="text-[12px] flex gap-1"
                        >
                          <Image
                            src="/images/logo-web/calendar-2-line.svg"
                            width={12}
                            height={12}
                          ></Image>
                          {item.type}
                        </p>
                        <p
                          style={inter.style}
                          className="text-[12px] flex gap-1"
                        >
                          <Image
                            src="/images/money-dollar-circle-fill.svg"
                            width={12}
                            height={12}
                          ></Image>
                          {item.minRange} - {item.maxRange}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5 mt-3 font-medium text-[#616161] h-10">
                    <button className="flex items-center gap-3 active:text-[#BF5F82]">
                      <Image
                        src="/images/logo-web/Vector.svg"
                        width={22}
                        height={22}
                      ></Image>
                      FOLLOW
                    </button>
                    <button className="w-28 rounded-3xl p-1 border-2 border-[#F48FB1] hover:bg-[#BF5F82] hover:text-white active:bg-[#FFC1E3] text-[14px]">
                      SEE MORE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
