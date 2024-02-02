import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Page() {
  return (
    <div className="w-full h-screen bg-neutral-100 justify-center items-start inline-flex">
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
      <div className="grow self-stretch px-[120px] pb-[667px] bg-neutral-100 justify-center items-center inline-flex">
        <div className="self-stretch flex-col h-[169px] w-[960px] justify-start items-start gap-4 inline-flex relative right-6 py-8">
          <div className="h-[169px] flex-col justify-start items-start gap-4 flex relative right-6">
            <div
              className="self-stretch text-neutral-700 text-[34px] tracking-tight"
              style={montserrat.style}
            >
              Find that job
            </div>
            <div className="h-28 relative">
              <div className="w-[960px] h-[52px] left-0 top-[60px] absolute justify-start items-start gap-4 inline-flex">
                <div className="flex-col justify-start items-start gap-1 inline-flex">
                  <div
                    className="text-zinc-600 text-[10px] uppercase relative top-[3px] tracking-[.10em]"
                    style={inter.style}
                  >
                    Category
                  </div>
                  <img
                    className="w-[20px] h-[20px] absolute left-[545px] top-[28px] z-10"
                    src="/images/arrowdown.svg"
                  />
                  <select className="category w-[280px] h-[39px] px-2 border-rose-300 rounded-lg border-2 focus:outline-none hover:text-zinc-600 focus:text-neutral-400 focus:ring appearance-none">
                    <option value="" disabled selected>
                      Select a category
                    </option>
                    <option className="text-neutral-700" value="it">
                      IT
                    </option>
                    <option className="text-neutral-700" value="marketing">
                      Marketing
                    </option>
                    <option className="text-neutral-700" value="programmer">
                      Programmer
                    </option>
                  </select>
                </div>
                <div className="flex-col justify-start items-start gap-1 inline-flex ">
                  <div
                    className="text-zinc-600 text-[10px] uppercase relative top-[3px] tracking-[.10em]"
                    style={inter.style}
                  >
                    Type
                  </div>
                  <img
                    className="w-[20px] h-[20px] absolute right-[690px] top-[28px] z-10"
                    src="/images/arrowdown.svg"
                  />
                  <select className="type  w-[280px] h-[39px] px-2 border-rose-300 rounded-lg border-2 focus:outline-none  hover:text-zinc-600 focus:text-neutral-400 focus:ring appearance-none">
                    <option value="" disabled selected>
                      Select a type
                    </option>
                    <option className="text-neutral-700" value="it">
                      IT
                    </option>
                    <option className="text-neutral-700" value="marketing">
                      Marketing
                    </option>
                    <option className="text-neutral-700" value="programmer">
                      Programmer
                    </option>
                  </select>
                </div>
                <div className="flex-col justify-start items-start gap-1 inline-flex ">
                  <div
                    className="text-zinc-600 text-[10px] uppercase tracking-wider"
                    style={inter.style}
                  >
                    Salary Range
                  </div>
                  <div className="justify-start items-center gap-2 inline-flex ">
                    <div className="h-9 p-2 bg-white rounded-lg border-2 border-rose-300 justify-start items-center gap-2 flex ">
                      <div className="w-5 h-5 justify-center items-center flex relative "></div>
                      <div
                        className=" h-5 text-neutral-400 text-sm leading-tight tracking-tight"
                        style={inter.style}
                      >
                        <img
                          className="w-[20px] h-[20px] absolute left-[600px] z-10"
                          src="/images/dollar.svg"
                        />
                        <input
                          type="number"
                          className="focus:outline-none w-[72px] pl-[10px] text-neutral-700"
                          id="money"
                          name="money"
                          placeholder="min"
                        />
                      </div>
                    </div>
                    <div className="w-[15px] h-[0px] rounded-lg border-2 border-neutral-400 "></div>
                    <div className="h-9 p-2 bg-white rounded-lg border-2 border-rose-300 justify-start items-center gap-2 flex ">
                      <div className="w-5 h-5 justify-center items-center flex "></div>
                      <div
                        className="h-5 text-neutral-400 text-sm leading-tight tracking-tight"
                        style={inter.style}
                      >
                        <img
                          className="w-[20px] h-[20px] absolute left-[750px] z-10"
                          src="/images/dollar.svg"
                        />
                        <input
                          type="number"
                          className="focus:outline-none w-[72px] pl-[10px] text-neutral-700"
                          id="money"
                          name="money"
                          placeholder="max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[419.93px] h-[52px] left-0 top-0 absolute flex-col justify-start items-start gap-1 inline-flex ">
                <div
                  className="text-zinc-600 text-[10px] uppercase tracking-wider relative top-[3px]"
                  style={inter.style}
                >
                  search by job title or company name
                </div>
                <div className="self-stretch p-2 bg-white rounded-lg border-2 border-rose-300 justify-start items-center gap-2 inline-flex">
                  <div className="w-5 h-5 justify-center items-center flex">
                    <div className="w-5 h-5 relative"></div>
                  </div>
                  <div
                    className=" h-5 text-neutral-400 text-sm leading-tight tracking-tight"
                    style={inter.style}
                  >
                    <img
                      className="w-[20px] h-[20px] absolute left-2 z-10"
                      src="/images/serach-2.png"
                    />
                    <input
                      type="search"
                      className="w-[389px] h-9 rounded-lg text-neutral-700 focus:outline-none justify-start items-start gap-2 inline-flex p-2 relative right-2 bottom-2"
                      id="site-search"
                      name="search"
                      placeholder="manufacturing, sales, swim"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
