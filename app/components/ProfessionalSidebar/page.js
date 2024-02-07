import React from "react";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Sidebar() {
  return (
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
        <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex">
          <img className="w-[24px] h-[24px]" src="/images/following.png" />
          <div
            className="grow shrink basis-0 text-zinc-600 leading-normal"
            style={inter.style}
          >
            Following
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
          <div className=" text-zinc-600 leading-normal" style={inter.style}>
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
  );
}
