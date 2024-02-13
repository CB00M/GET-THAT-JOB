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
import Sidebar from "@/app/components/ProfessionalSidebar/page.js";
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
        <Sidebar />

        <div className=" py-[10px] px-[20px] ml-[150px] ">
          <p
            className=" py-[10px]  text-neutral-700 text-[34px] font-medium"
            style={montserrat.style}
          >
            Your applications
          </p>
          {/* <----------------------------------------------------the job title--------------------------------------------------> */}

          <div className="mt-[10px] ">
            <div
              className="text-zinc-600 text-[10px] uppercase relative top-[3px] tracking-[.10em] "
              style={inter.style}
            >
              filter your applications
            </div>
            <div
              className="pt-2 inline-flex gap-4 text-zinc-600 text-sm leading-tight tracking-[.01em] "
              style={inter.style}
            >
              <span>
                <input
                  type="radio"
                  id="all"
                  name="filter-your-applications"
                  value="all"
                  className="scale-150 mr-[6px] relative top-[2px] form-radio accent-pink-500 "
                />
                All
              </span>
              <span>
                <input
                  type="radio"
                  id="waiting"
                  name="filter-your-applications"
                  value="waiting"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                />
                Waiting
              </span>
              <span>
                <input
                  type="radio"
                  id="in-progress"
                  name="filter-your-applications"
                  value="in-progress"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                />
                In progress
              </span>
              <span>
                <input
                  type="radio"
                  id="finished"
                  name="filter-your-applications"
                  value="finished"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                />
                Finished
              </span>
              <span>
                <input
                  type="radio"
                  id="declined"
                  name="filter-your-applications"
                  value="declined"
                  className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                />
                Declined
              </span>
            </div>
          </div>
          {/* <----------------------------------------------------Filter your candidates--------------------------------------------------> */}
          <div>
            <h2
              className="  text-neutral-700 text-[22px] font-medium text-left my-[10px]"
              style={montserrat.style}
            >
              4 applications found
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
                          <div className=" w-[350px] p-2 flex flex-row">
                            {/*left-container*/}
                            <Image src="/logo.png" width={60} height={60} />

                            <div className="flex flex-col ml-4">
                              <h2
                                className="   text-[22px] font-medium text-left"
                                style={montserrat.style}
                              >
                                The job title
                              </h2>

                              <p className="  text-[#616161] text-[16px] font-medium">
                                The Company Name SA
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-row  ">
                            {/* middle-container */}
                            <div className="text-[#8e8e8e] text-[12px] mr-[150px]">
                              <div className="flex flex-row justify-start content-end  ">
                                <div className="flex flex-row ml-1 ">
                                  <Image
                                    src="/factory.svg"
                                    width={15}
                                    height={20}
                                  />
                                  <p className=" py-[10px] text-[#8e8e8e] text-[16px] mx-2">
                                    Manufactoring
                                  </p>
                                </div>
                                <div className="flex flex-row ml-1">
                                  <Image
                                    src="/calendar-2-line.svg"
                                    width={15}
                                    height={20}
                                  />
                                  <p className=" py-[10px] text-[#8e8e8e] text-[16px] mx-2">
                                    Full time
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-row   relative bottom-3">
                                <div className="flex flex-row ml-1 ">
                                  <Image
                                    src="/dollar.svg"
                                    width={15}
                                    height={20}
                                  />
                                  <p className=" py-[10px] text-[#8e8e8e] text-[16px] mx-2">
                                    2.0k - 2.5k
                                  </p>
                                </div>
                                <div className="flex flex-row mr-1 ">
                                  <Image
                                    src="/clock.svg"
                                    width={15}
                                    height={20}
                                  />
                                  <p className=" py-[10px] text-[#8e8e8e] text-[16px] mx-2">
                                    Posted 2 days ago
                                  </p>
                                </div>
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
                    </div>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    style={montserrat.style}
                    className="font-medium"
                  >
                    {" "}
                    <h2 className="  text-[#c67190] text-[20px] font-medium text-left my-2">
                      Professional experience
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h2 className="  text-[#c67190] text-[20px] font-medium text-left my-2">
                      Why are you interested in working at the company name SA
                    </h2>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <p>-Lorem ipsum dolor sit amet, consectetur</p>
                    <div className="flex relative left-[400px] bottom-[5px] mt-[20px]">
                      <Image
                        src="/x-icon.svg"
                        width={28}
                        height={20}
                        className="absolute left-[14px] top-[10px]"
                      />
                      <button className=" w-[260px] h-[50px] bg-[#bf5f82] text-white rounded-[22px] text-[16px] text-right pr-[20px]  uppercase ">
                        decline application
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
