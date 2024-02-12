"use client";
import React from "react";
import { Montserrat, Inter } from "next/font/google";
import "tailwindcss/tailwind.css";
import Sidebar from "@/app/components/ProfessionalSidebar/page";
import { HiChevronLeft } from "react-icons/hi";
import { MdOutlineWatchLater } from "react-icons/md";
import Image from "next/image";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  return (
    <>
      <div className="w-full h-[1050px] bg-neutral-100  items-start inline-flex">
        <Sidebar />

        {/*Job Details */}
        <div className="w-[1200px] h-[800px] py-[10px] px-[20px] ml-[150px]">
          <div className=" flex">
            <HiChevronLeft className="w-6 h-5 items-center" />
            <p className="text-[14px]">BACK</p>
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
                  ></Image>
                </button>
              </div>
            </header>
            <h1 className="text-center text-5xl">The job title</h1>
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
                  Manufacturing
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
                  Full time
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
                  2000 - 2500
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <h3 className="text-2xl text-[#BF5F82] my-2">
                  About The company name SA
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
                  Mandotory Requirments
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
                  Optional Requirments
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

              <button className="mt-3 m-auto">
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
