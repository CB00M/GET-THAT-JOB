"use client";
import React, { useState, useEffect } from "react";
import { Montserrat, Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import Sidebar from "@/app/components/ProfessionalSidebar/page";
import { HiChevronLeft } from "react-icons/hi";
import { MdOutlineWatchLater } from "react-icons/md";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { NotFound } from "next/navigation";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function post({ params }) {
  const router = useRouter();

  const supabase = createClient();

  const [job, setJob] = useState([]);

  const getDetailJob = async () => {
    let { data, error } = await supabase
      .from("job_posting")
      .select("*")
      .eq("id", params.id);
    if (error || !data) {
      console.log("error:", error);
      NotFound();
    }
    setJob(data[0]);
  };
  useEffect(() => {
    getDetailJob();
  }, [params.id]);

  return (
    <>
      <div className="w-full h-[1050px] bg-neutral-100  items-start inline-flex">
        <Sidebar />

        {/*Job Details */}
        <div className="w-[1200px] h-[800px] py-[10px] px-[20px] ml-[150px]">
          <div className=" flex">
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
            <header className="flex justify-between items-center">
              <div className="flex gap-2">
                <Image
                  src="/images/logo-web/Web-logo.svg"
                  width={80}
                  height={80}
                ></Image>
                <div className="flex flex-col tracking-wide">
                  <h2 className="text-2xl">The company name SA</h2>
                  <p className="flex items-center gap-1 mt-1">
                    <Image
                      src="/images/IconButton.svg"
                      width={38}
                      height={38}
                    ></Image>
                    Following
                  </p>
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
            <h1 className="text-center text-5xl">{job.title}</h1>
            <p className="flex items-center gap-1 text-[10px] justify-center mt-3">
              <MdOutlineWatchLater />
              POSTED 2 DAYS AGO
            </p>
            <div className="flex justify-around items-center my-3">
              <div className="h-[77px] w-2/6 border border-[#BF5F82] flex flex-col justify-center items-center rounded-lg  p-2 bg-white">
                <h2 className="text-base">Category</h2>
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
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  blanditiis praesentium eius doloremque, iusto ratione in
                  aspernatur vitae saepe quis architecto consequatur accusamus
                  ad iure esse, optio repudiandae? Animi doloribus temporibus
                  esse vitae praesentium maxime molestias. Consequatur, saepe.
                  Quis impedit ut, dolores adipisci facere deserunt libero
                  deleniti similique nobis sequi.
                </p>
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
