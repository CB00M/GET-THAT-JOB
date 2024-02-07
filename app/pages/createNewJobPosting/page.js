import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  return (
    <>
      <div className="w-full h-[900px] bg-neutral-100  items-start inline-flex">
        <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex">
          <div className="flex-col justify-start items-start flex">
            <div className="px-4 pb-[32px] flex-col justify-center items-start flex">
              <img className="w-[136px] h-10" src="/images/gtj-logo.png" />
            </div>
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
              <img
                className="w-[24px] h-[24px]"
                src="/images/your applications.png"
              />
              <div
                className="grow text-zinc-600 leading-normal"
                style={inter.style}
              >
                Job Posting
              </div>
            </div>
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
              <img className="w-[24px] h-[24px]" src="/images/serach.png" />
              <div
                className="grow text-neutral-700 leading-normal"
                style={inter.style}
              >
                Create New Job
              </div>
            </div>
            <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
              <img className="w-[24px] h-[24px]" src="/images/profile.png" />
              <div
                className="grow text-zinc-600 leading-normal"
                style={inter.style}
              >
                Profile
              </div>
            </div>
            <div className="w-60 px-4 py-3 bg-neutral-200 justify-start items-start gap-2 inline-flex">
              <img className="w-[24px] h-[24px]" src="/images/logout.png" />
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
          <p
            className=" pt-[10px]
             text-zinc-600 text-[10px] "
            style={inter.style}
          >
            JOB TITLE
          </p>
          <input
            className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2  "
            type="text"
            placeholder="Software engineer"
          />
          <p
            className=" pt-[10px]
            text-zinc-600 text-[10px]"
            style={inter.style}
          >
            JOB CATEGORY
          </p>
          <input
            className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2 "
            type="text"
            placeholder="Select or create a category"
          />
          <p
            className=" pt-[10px]
            text-zinc-600 text-[10px]"
            style={inter.style}
          >
            TYPE
          </p>
          <input
            className="w-[389px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2 "
            type="text"
            placeholder="Select a type"
          />
          <p
            className=" pt-[10px]
            text-zinc-600 text-[10px]"
            style={inter.style}
          >
            SALARY RANGE
          </p>
          <div className="relative">
            <img
              className=" w-[22px] h-[22px] absolute top-4 left-[13px]"
              src="/images/money-dollar-circle-fill.svg"
              alt="money-dollar-circle-fill"
            />
            <img
              className="w-[22px] h-[22px] absolute top-4 left-[136px] "
              src="/images/money-dollar-circle-fill.svg"
              alt="money-dollar-circle-fill"
            />
            <input
              className="w-[100px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-11 "
              type="text"
              placeholder="min"
            />{" "}
            <span className="text-[30px] text-neutral-400">- </span>{" "}
            <input
              className="w-[100px] h-9 rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-11 "
              type="text"
              placeholder="max"
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
            className="w-[760px] h-[76px] rounded-lg text-neutral-700  border-2 border-[#F48FB1]  pl-2 pb-6"
            type="text"
            placeholder="Describe the main function and charecteristic of your job position"
          />
          <p
            className=" pt-[10px]
            text-zinc-600 text-[10px]"
            style={inter.style}
          >
            MANDATORY REQUIREMANTS
          </p>
          <input
            className="w-[760px] h-[76px] rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2 pb-6 "
            type="text"
            placeholder="List each mandatiry requirement in new line"
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
              className="w-[760px] h-[76px] rounded-lg text-neutral-700  border-2 border-[#F48FB1] pl-2 pb-6"
              type="text"
              placeholder="List each optional requirement in new line"
            />
          </div>
          <button className="border-2 border-[#F48FB1] text-white rounded-2xl bg-[#F48FB1] mt-5 mb-5 py-1 px-3 ">
            POST THIS JOB
          </button>
        </div>
      </div>
    </>
  );
}
