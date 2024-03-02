"use client";
import React, { useState, useEffect } from "react";
import { Montserrat, Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import { handleLogout } from "@/app/login/actions";
import { HiChevronLeft } from "react-icons/hi";
import { MdOutlineWatchLater } from "react-icons/md";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { NotFound } from "next/navigation";
import Link from "next/link";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function post({ params }) {
  const router = useRouter();

  const supabase = createClient();

  const [job, setJob] = useState([]);
  const [logoCompany, setLogoCompany] = useState("");

  // ดึงข้อมูลบริษัท
  const [companyData, setCompanyData] = useState([]);

  const getAboutCompany = async () => {
    let { data, error } = await supabase
      .from("Recruiterusers")
      .select("*")
      .eq("email", job.company_email);

    if (error || !data) {
      console.log("error:", error);
      NotFound(); // แก้เป็น router.push("/404") หรือหน้าที่เหมาะสมสำหรับการแสดงผลเมื่อไม่พบข้อมูลบริษัท
    }
    setCompanyData(data);
  };

  // const getLogoCompany = () => {
  //   let { publicURL, error } = supabase
  //     .from("Recruiterusers")
  //     .getPublicUrl("companyLogo");
  //   console.log(publicURL);
  //   if (error) {
  //     console.log("ดึงรูปไม่ได้", error);
  //   }
  //   setLogoCompany(publicURL);
  // };

  // useEffect(() => {
  //   getLogoCompany();
  // }, []);

  const getDetailJob = async () => {
    let { data, error } = await supabase
      .from("job_posting")
      .select("*")
      .eq("id", params.id);
    if (error || !data) {
      console.log("error:", error);
      NotFound(); // แก้เป็น router.push("/404") หรือหน้าที่เหมาะสมสำหรับการแสดงผลเมื่อไม่พบข้อมูลงาน
    }
    setJob(data[0]);
  };

  useEffect(() => {
    getDetailJob();
  }, [params.id]);

  useEffect(() => {
    if (job.company_email) {
      getAboutCompany();
    }
  }, [job.company_email]); // ให้เรียกใช้ getAboutCompany เมื่อมีการเปลี่ยนแปลง job.company_email

  console.log("job company", job.company_email);
  console.log("company data", companyData);

  //logout
  const handleLogoutClick = () => {
    handleLogout();
    alert("You have been logged out.");
  };

  return (
    <>
      <div
        className="w-full h-[1050px] bg-neutral-100  items-start inline-flex"
        style={inter.style}
      >
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

        {/*Job Details */}
        <div className="w-[1000px] h-[800px] py-[10px] px-[20px] ml-[100px]">
          <div className=" flex pt-[30px] mb-[-20px]">
            <HiChevronLeft className="w-6 h-5 items-center" />
            <button
              onClick={() => {
                router.push("/pages/findJob");
              }}
              className="text-[14px]"
            >
              BACK
            </button>
          </div>
          <article className="mt-5">
            {companyData.map((item) => {
              return (
                <div>
                  <header className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Image
                        src="/images/logo-web/Web-logo.svg"
                        width={80}
                        height={80}
                      ></Image>
                      <div className="flex flex-col tracking-wide">
                        <h2 className="text-2xl">{item.company}</h2>
                      </div>
                    </div>
                    <div>
                      <button>
                        <Image
                          src="/images/logo-web/Button.svg"
                          width={173}
                          height={56}
                          onClick={() => {
                            router.push(`/pages/findJob/${job.id}/apply`);
                          }}
                        ></Image>
                      </button>
                    </div>
                  </header>
                </div>
              );
            })}

            <h1 className="text-center text-5xl">{job.title}</h1>

            <div className="flex justify-around items-center my-3">
              <div className="h-[77px] w-2/6 border border-[#BF5F82] flex flex-col justify-center items-center rounded-lg  p-2 bg-white">
                <h2 className="text-base text-[#616161]">Category</h2>
                <p className="flex items-end text-2xl gap-2">
                  <Image
                    src="/images/logo-web/Group.svg"
                    width={29}
                    height={29}
                  ></Image>
                  {job.category}
                </p>
              </div>
              <div className="h-[77px] w-1/5 border border-[#BF5F82] flex flex-col justify-center items-center rounded-lg  p-2 bg-white">
                <h2 className="text-base">Type</h2>
                <p className="flex items-end text-2xl gap-2">
                  <Image
                    src="/images/logo-web/calendar-2-line.svg"
                    width={29}
                    height={29}
                  ></Image>
                  {job.type}
                </p>
              </div>
              <div className="h-[77px] w-2/6 border border-[#BF5F82] flex flex-col justify-center items-center rounded-lg  p-2 bg-white">
                <h2 className="text-base">Salary</h2>
                <p className="flex items-end text-2xl gap-2">
                  <Image
                    src="/images/logo-web/money-circle-line.svg"
                    width={29}
                    height={29}
                  ></Image>
                  {job.minRange} - {job.maxRange}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <h3 className="text-2xl text-[#BF5F82] my-2">
                  About The company
                </h3>
                {companyData.map((item) => {
                  return <p>{item.about_company}</p>;
                })}
              </div>
              <div className="my-2">
                <h3 className="text-2xl text-[#BF5F82] my-2">
                  About the job position
                </h3>
                <p>{job.aboutJob}</p>
              </div>
              <div className="my-2">
                <h3 className="text-2xl text-[#BF5F82] my-2">
                  Mandotory Requirments
                </h3>
                <p>{job.mandaturyRequier}</p>
              </div>
              <div className="my-2">
                <h3 className="text-2xl text-[#BF5F82] my-2">
                  Optional Requirments
                </h3>
                <p>{job.optionalRequier}</p>
              </div>

              <button
                className="mt-3 m-auto"
                onClick={() => {
                  router.push(`/pages/findJob/${job.id}/apply`);
                }}
              >
                <Image
                  src="/images/logo-web/Button.svg"
                  width={173}
                  height={56}
                ></Image>
              </button>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
