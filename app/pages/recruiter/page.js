import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Page() {
  return (
    <div className="w-full h-screen bg-neutral-100 justify-center items-start inline-flex ">
      <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex ">
        <div className="flex-col justify-start items-start flex">
          <div className="px-4 pb-[32px] flex-col justify-center items-start flex ">
            <img className="w-[136px] h-10" src="/images/gtj-logo.png" />
          </div>
          <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
            <img className="w-[24px] h-[24px]" src="/images/jobposting.svg" />
            <div
              className="grow text-neutral-700 leading-normal "
              style={inter.style}
            >
              Job Postings
            </div>
          </div>
          <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex ">
            <img className="w-[24px] h-[24px]" src="/images/createnewjob.svg" />
            <div
              className="grow text-zinc-600 leading-normal "
              style={inter.style}
            >
              Create New Job
            </div>
          </div>
          <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex ">
            <img className="w-[24px] h-[24px]" src="/images/profile.svg" />
            <div
              className="grow text-zinc-600 leading-normal"
              style={inter.style}
            >
              Profile
            </div>
          </div>
          <div className="w-60 px-4 py-3 bg-neutral-200 justify-start items-start gap-2 inline-flex">
            <img className="w-[24px] h-[24px]" src="/images/logout.svg" />
            <div className=" text-zinc-600 leading-normal " style={inter.style}>
              Log out
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-3 inline-flex w-60 px-4 ">
          <div
            className="text-zinc-600 text-xs leading-none"
            style={montserrat.style}
          >
            © 202X - Get That Job
          </div>
        </div>
      </div>
      <div className="grow self-stretch px-[120px] pb-[667px]  bg-neutral-100 justify-center items-center inline-flex">
        <div className="self-stretch h-[169px] w-[960px] flex-col justify-start items-start gap-4 flex relative right-12 py-8">
          <div
            className="self-stretch text-neutral-700 text-[34px] tracking-tight "
            style={montserrat.style}
          >
            Job Postings
          </div>
          <div className="w-[419.93px] h-[52px] left-2.5 top-[98px] absolute flex-col justify-start items-start gap-1 inline-flex">
            <div
              className="text-zinc-600 text-[10px] uppercase relative top-[3px] tracking-[.10em]"
              style={inter.style}
            >
              filter your job postings
            </div>
            <div
              className="pt-2 inline-flex gap-4 text-zinc-600 text-sm leading-tight tracking-[.01em]    "
              style={inter.style}
            >
              <span>
                <input
                  type="radio"
                  name="all"
                  className="scale-150 mr-[6px] relative top-[2px]"
                />
                All
              </span>
              <span>
                <input
                  type="radio"
                  name="with candidateds on track"
                  className="scale-150 mr-[6px] relative top-[2px]"
                />
                With candidates on track
              </span>
              <span>
                <input
                  type="radio"
                  name="closed"
                  className="scale-150 mr-[6px] relative top-[2px]"
                />
                Closed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
