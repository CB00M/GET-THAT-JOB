"use client";
import React, { useState, useEffect } from "react";
import { Montserrat, Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import "../../globals.css";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleLogout } from "@/app/login/actions";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  const router = useRouter();
  const supabase = createClient();
  const [searchBox, setSearchBox] = useState("");
  const [category, setCategory] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const [findJobs, setFindJobs] = useState([]);
  const [companyData, setCompanydata] = useState([]);

  console.log("companyData :", companyData);
  console.log("findjobs :", findJobs);

  const fetchCompanyData = async () => {
    let { data, error } = await supabase.from("Recruiterusers").select("*");
    console.log(data);
    if (error || !data) {
      console.log("error:", error);
    }
    setCompanydata(data);
  };

  const fetchFindJobs = async () => {
    let { data, error } = await supabase
      .from("job_posting")
      .select("*")
      .eq("closed_status", true);
    console.log(data);
    if (error || !data) {
      console.log("error:", error);
    }
    setFindJobs(data);
  };
  const handleMinSalary = (event) => {
    setMinSalary(event.target.value);
  };
  const handleMaxSalary = (event) => {
    setMaxSalary(event.target.value);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  // ฟังก์ชั่นสำหรับการเลือก option ของ job type
  const handleSelectJobType = (event) => {
    setSelectedJobType(event.target.value);
  };
  // ดึงรูปภาพโลโก้จาก recruiterUsers
  // const getLogoCompany = async () => {
  //   let { data, error } = await supabase.from("job_posting").select(`
  //   *,
  //   Recruiterusers(*)
  // `);
  //   console.log(data);
  //   if (error) {
  //     console.log("ดึงไฟล์รูปไม่ได้", error);
  //   }
  // };

  useEffect(() => {
    fetchFindJobs();
    fetchCompanyData();
  }, []);

  //logout
  const handleLogoutClick = () => {
    handleLogout();
    alert("You have been logged out.");
  };

  return (
    <>
      <div className="w-full h-[1050px] bg-neutral-100  items-start inline-flex">
        {/*Sidebar */}
        <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start flex">
            <div className="px-4 pb-[32px] flex-col justify-center items-start flex">
              <img className="w-[136px] h-10" src="/images/gtj-logo.png" />
            </div>
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
              <img className="w-[24px] h-[24px]" src="/images/serach.png" />
              <div
                className="grow text-neutral-700 leading-normal"
                style={inter.style}
              >
                Find that job
              </div>
            </div>
            <Link href={"/pages/yourApplications"}>
              <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
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
            </Link>
            <Link href={"/pages/editProfileProfessional"}>
              <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
                <img className="w-[24px] h-[24px]" src="/images/profile.png" />
                <div
                  className="grow text-zinc-600 leading-normal"
                  style={inter.style}
                >
                  Profile
                </div>
              </div>
            </Link>
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
            className="w-[389px] h-9 rounded-lg   border-2 border-[#F48FB1] pl-2  "
            type="text"
            placeholder="manufacturing, sales, swim"
            onChange={(e) => setSearchBox(e.target.value)}
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
                className="w-[250px] h-9 rounded-lg   border-2 border-[#F48FB1] pl-2 "
                value={category}
                onChange={(event) => {
                  handleCategory(event);
                }}
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
                  className="w-[250px] h-9 rounded-lg  border-2 border-[#F48FB1] pl-2 "
                  value={selectedJobType}
                  onChange={(event) => {
                    handleSelectJobType(event);
                  }}
                >
                  <option value="">Select a type</option>
                  <option className="text-black" value="Full time">
                    Full time
                  </option>
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
                  className="  absolute mt-4 ml-[13px]"
                  src="/images/money-dollar-circle-fill.svg"
                  width={22}
                  height={22}
                  alt="money-dollar-circle-fill"
                />
                <Image
                  className="absolute mt-4 ml-[190px] "
                  src="/images/money-dollar-circle-fill.svg"
                  width={22}
                  height={22}
                  alt="money-dollar-circle-fill"
                />
                <input
                  name="minRange"
                  className="w-[150px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-11 "
                  type="number"
                  placeholder="min"
                  value={minSalary}
                  onChange={(event) => {
                    handleMinSalary(event);
                  }}
                />
                <span className="text-[30px] text-neutral-400"> - </span>
                <input
                  className="w-[150px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-11 "
                  type="number"
                  name="maxRange"
                  placeholder="max"
                  value={maxSalary}
                  onChange={(event) => {
                    handleMaxSalary(event);
                  }}
                />
              </div>
            </div>
          </div>
          <p style={montserrat.style} className="font-medium mt-3 text-xl">
            {/* จำนวนงานหลังจากทีกรองข้อมูลแล้ว */}
            {
              findJobs.filter((job) => {
                const titleOrCompanyMatch =
                  job.title.toLowerCase().includes(searchBox.toLowerCase()) ||
                  job.category.toLowerCase().includes(searchBox.toLowerCase());
                const categoryMatch =
                  category === "" ||
                  job.category.toLowerCase() === category.toLowerCase();
                const typeMatch =
                  selectedJobType === "" ||
                  job.type.toLowerCase() === selectedJobType.toLowerCase();
                const minRangeMatch =
                  minSalary === "" || job.minRange >= parseInt(minSalary);
                const maxRangeMatch =
                  maxSalary === "" || job.maxRange <= parseInt(maxSalary);

                return (
                  titleOrCompanyMatch &&
                  categoryMatch &&
                  typeMatch &&
                  minRangeMatch &&
                  maxRangeMatch
                );
              }).length
            }
            jobs for you
          </p>
          <div className="flex flex-wrap gap-5 mt-3">
            {/* Show job cards */}

            {findJobs
              .filter((job) => {
                // กรองตำแหน่งงานโดยใช้ชื่อตำแหน่งหรือชื่อบริษัท
                const titleOrCompanyMatch =
                  job.title.toLowerCase().includes(searchBox.toLowerCase()) ||
                  job.category.toLowerCase().includes(searchBox.toLowerCase());

                // กรองตำแหน่งงานโดยใช้ Category
                const categoryMatch =
                  category === "" ||
                  job.category.toLowerCase() === category.toLowerCase();

                // กรองตำแหน่งงานโดยใช้ Type
                const typeMatch =
                  selectedJobType === "" ||
                  job.type.toLowerCase() === selectedJobType.toLowerCase();

                const minRangeMatch =
                  minSalary === "" || job.minRange >= parseInt(minSalary);
                const maxRangeMatch =
                  maxSalary === "" || job.maxRange <= parseInt(maxSalary);

                // คืนค่า true เมื่อตำแหน่งงานตรงกับเงื่อนไขทั้งหมด
                return (
                  titleOrCompanyMatch &&
                  categoryMatch &&
                  typeMatch &&
                  minRangeMatch &&
                  maxRangeMatch
                );
              })
              .map((item) => {
                return (
                  <div
                    key={item.id}
                    className=" p-[10px] h-44 border rounded-lg bg-white "
                  >
                    <div className="mt-4 flex gap-2 justify-center items-center">
                      <div>
                        {companyData.map((data) => {
                          if (data.email === item.company_email) {
                            return (
                              <Image
                                src={data.companyLogo}
                                alt="logoweb"
                                width={74}
                                height={74}
                              />
                            );
                          }
                        })}
                      </div>
                      <div>
                        <p className="text-neutral-400 text-[12px] flex gap-1 items-center">
                          <Image
                            src="/images/logo-web/Group.svg"
                            alt="logoweb"
                            width={11}
                            height={11}
                          ></Image>
                          {item.category}
                        </p>
                        <p
                          style={montserrat.style}
                          className="content-word overflow-hidden whitespace-nowrap text-ellipsis text-xl font-medium"
                        >
                          {item.title}
                        </p>
                        <p
                          style={montserrat.style}
                          className="font-medium text-sm w-[220px]"
                        >
                          {companyData.map((data) => {
                            if (data.email === item.company_email) {
                              return data.company;
                            }
                          })}
                        </p>
                        <div className="flex gap-3 text-neutral-400">
                          <p
                            style={inter.style}
                            className="text-[12px] flex gap-1"
                          >
                            <Image
                              src="/images/logo-web/calendar-2-line.svg"
                              alt="logoweb"
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
                              alt="money-dollar"
                              width={12}
                              height={12}
                            ></Image>
                            {item.minRange} - {item.maxRange}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center  mt-3 font-medium text-[#616161] h-10">
                      <button
                        className=" w-28 rounded-3xl p-1 border-2 border-[#F48FB1] hover:bg-[#BF5F82] hover:text-white active:bg-[#FFC1E3] text-[14px]"
                        onClick={() => {
                          router.push(`/pages/findJob/${item.id}`);
                        }}
                      >
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
