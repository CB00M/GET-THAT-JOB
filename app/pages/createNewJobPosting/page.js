"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import { useState } from "react";
import { Cookie } from "next/font/google";
import { keepData } from "./api/createNewPost";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  const [title, setTitle] = useState("");
  //category
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [type, setType] = useState("");
  const [minRange, setMinRange] = useState("");
  const [maxRange, setMaxRange] = useState("");
  const [aboutJob, setAboutJob] = useState("");
  const [mandaturyRequier, setMandaturyRequier] = useState("");
  const [optionalRequier, setOptionalRequier] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (value === "create_new") {
      setIsCreatingNewCategory(true);
      setSelectedCategory("");
    } else {
      setIsCreatingNewCategory(false);
      setSelectedCategory(value);
    }
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleSubmit = () => {
    const category = isCreatingNewCategory ? newCategory : selectedCategory;

    // เก็บค่า category ไว้ใน state
    setSelectedCategory(category);

    setTitle(title);
    setType(type);
    setMinRange(minRange);
    setMaxRange(maxRange);
    setAboutJob(aboutJob);
    setMandaturyRequier(mandaturyRequier);
    setOptionalRequier(optionalRequier);
  };
  return (
    <>
      <div className="w-full h-[900px] bg-neutral-100  items-start inline-flex">
        <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start flex">
            <div className="px-4 pb-[32px] flex-col justify-center items-start flex">
              <Image src="/images/gtj-logo.png" width={136} height={40} />
            </div>
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
              <Image
                src="/images/your applications.png"
                width={24}
                height={24}
              />
              <div
                className="grow text-zinc-600 leading-normal"
                style={inter.style}
              >
                Job Posting
              </div>
            </div>
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
              <Image src="/images/serach.png" width={24} height={24} />
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

        <div className="w-[800px] h-[800px] py-[10px] px-[20px] ml-[150px] ">
          <p
            className=" py-[10px]  text-neutral-700 text-[34px] "
            style={montserrat.style}
          >
            Create new job posting
          </p>
          <p
            className=" pt-[5px]  text-neutral-700 text-[20px] "
            style={montserrat.style}
          >
            Main information
          </p>
          <form action={keepData}>
            <p
              className=" pt-[10px]
             text-zinc-600 text-[10px] "
              style={inter.style}
            >
              JOB TITLE
            </p>
            <input
              name="title"
              className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
              type="text"
              placeholder="Software engineer"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <p
              className=" pt-[10px]
            text-zinc-600 text-[10px]"
              style={inter.style}
            >
              JOB CATEGORY
            </p>
            <label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2 "
              >
                <option value="">Select or create a category</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="legal">Legal</option>
                <option value="education">Education</option>
                <option value="goverment">Goverment</option>
                <option value="sales">Sales</option>
                <option value="create_new">Create New Category</option>
              </select>
              {isCreatingNewCategory && (
                <input
                  className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2 "
                  type="text"
                  value={newCategory}
                  onChange={handleNewCategoryChange}
                  placeholder="Enter new category"
                />
              )}
            </label>
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
                className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2 "
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <option value="">Select a type</option>
                <option value="fullTime">Full time</option>
                <option value="partTime">Part time</option>
              </select>
            </label>
            <p
              className=" pt-[10px]
            text-zinc-600 text-[10px]"
              style={inter.style}
            >
              SALARY RANGE
            </p>
            <div className="relative">
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
                value={minRange}
                onChange={(event) => {
                  setMinRange(event.target.value);
                }}
              />{" "}
              <span className="text-[30px] text-neutral-400">- </span>{" "}
              <input
                className="w-[100px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-11 "
                type="text"
                name="maxRange"
                placeholder="max"
                value={maxRange}
                onChange={(event) => {
                  setMaxRange(event.target.value);
                }}
              />
            </div>
            <p
              className=" pt-[30px]  text-neutral-700 text-[20px] "
              style={montserrat.style}
            >
              Additional information
            </p>
            <p
              className=" pt-[10px]
            text-zinc-600 text-[10px]"
              style={inter.style}
            >
              ABOUT THE JOB POSITION
            </p>
            <input
              name="aboutJob"
              className="w-[760px] h-[76px] rounded-lg text-neutral-700  border-2 border-[#F48FB1]  pl-2 pb-6"
              type="text"
              placeholder="Describe the main function and charecteristic of your job position"
              value={aboutJob}
              onChange={(event) => {
                setAboutJob(event.target.value);
              }}
            />
            <p
              className=" pt-[10px]
            text-zinc-600 text-[10px]"
              style={inter.style}
            >
              MANDATORY REQUIREMANTS
            </p>
            <input
              name="mandaturyRequier"
              className="w-[760px] h-[76px] rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2 pb-6 "
              type="text"
              placeholder="List each mandatiry requirement in new line"
              value={mandaturyRequier}
              onChange={(event) => {
                setMandaturyRequier(event.target.value);
              }}
            />
            <p
              className=" pt-[10px]
            text-zinc-600 text-[10px]"
              style={inter.style}
            >
              OPTIONAL REQUIREMENT
            </p>
            <div className="relative">
              <input
                name="optionalRequier"
                className="w-[760px] h-[76px] rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2 pb-6"
                type="text"
                placeholder="List each optional requirement in new line"
                value={optionalRequier}
                onChange={(event) => {
                  setOptionalRequier(event.target.value);
                }}
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="border-2 border-[#F48FB1] text-white rounded-2xl bg-[#F48FB1] mt-5 mb-5 py-1 px-3 "
            >
              POST THIS JOB
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
