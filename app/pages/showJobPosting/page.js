"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat, Inter } from "next/font/google";
import { useState } from "react";
import { Cookie } from "next/font/google";
import { keepData } from "../createNewJobPosting/api/createNewPost.js";
import Link from "next/link.js";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { px } from "framer-motion";

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

        <div className="w-[800px] h-[800px] py-[10px] px-[20px] ml-[150px] ">
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
              <div className="border border-slate-300 shadow-lg shadow-slate-400  rounded-[10px] w-[1080px]  p-5">
                <AccordionItem w="1050px">
                  <h2>
                    <div className="warpper flex relative">
                      <AccordionButton>
                        <span className="flex flex-row w-[1020px] ">
                          <div className=" w-[420px] p-2">
                            {/*left-container*/}
                            <h2
                              className="  text-neutral-700 text-[22px] font-medium text-left"
                              style={montserrat.style}
                            >
                              The job title
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
                              <Image
                                src="/man-icon-black.svg"
                                width={20}
                                height={20}
                              />
                              <p>Total</p>
                              <p>Candidates</p>
                            </div>
                            <div className="flex flex-col justify-center items-center m-2">
                              <Image
                                src="/man-icon-pink.svg"
                                width={20}
                                height={20}
                              />
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
                  <AccordionPanel pb={4}>
                    {" "}
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h2>Mandatory Requirements</h2>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <h2>Optional Requirements</h2>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
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
