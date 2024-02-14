import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";
import Sidebar from "../../components/ProfessionalSidebar/sidebarYourApplication/page";
import { m } from "framer-motion";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Page() {
  return (
    <div className="w-full h-screen bg-neutral-100 justify-center items-start inline-flex">
      <Sidebar />
      <div className="grow self-stretch px-[120px] pb-[667px] bg-neutral-100 justify-center items-center inline-flex">
        <div className="self-stretch flex-col h-[169px] w-[960px] justify-start items-start gap-4 inline-flex relative right-6 py-8">
          <div className="h-[169px] flex-col justify-start items-start gap-4 flex relative right-6">
            <div
              className="self-stretch text-neutral-700 text-[12px] font-bold tracking-wider relative left-[20px]"
              style={inter.style}
            >
              <img
                className="w-[240px] h-[240px] absolute right-[890px] bottom-[-110px] z-99"
                src="/images/arrow.png"
              />
              BACK
            </div>
            <div className="self-stretch text-neutral-700 text-[28px] tracking-tight">
              <div className="bg-white w-[74.67px] h-[74.67px] rounded-lg shadow-lg">
                <img
                  className="w-[280px] h-[260px] absolute right-[823px] bottom-[-30px]"
                  src="/images/webworklogo.png"
                />
              </div>
              <div
                className="relative bottom-[75px] left-[100px]"
                style={montserrat.style}
              >
                The company name SA
              </div>
              <div className="relative left-[840px] bottom-[100px]">
                <div
                  className="text-white bg-[#f48fb1] w-[233px] h-[56px] text-[14px] rounded-2xl ralative text-center"
                  style={inter.style}
                >
                  <img
                    className="w-[240px] h-[240px] absolute right-[845px] top-[-93px] z-99"
                    src="/images/letter.png"
                  />
                  <div className="relative right-[-15px] top-[17px] tracking-wider">
                    SEND APPLICATION
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch text-neutral-700 text-[12px]">
              <img
                className="w-[240px] h-[240px] absolute right-[760px] top-[-25px] z-99"
                src="/images/following-pink.png"
              />
              <div
                className="relative left-[143px] bottom-[80px] tracking-wider font-bold"
                style={inter.style}
              >
                <div className="relative bottom-[55px]">FOLLOWING</div>
              </div>
            </div>
            <div className="relative bottom-[120px]">
              <div
                className="self-stretch text-neutral-700 text-[45px] tracking-tight text-center w-[1000px]"
                style={montserrat.style}
              >
                The job title
              </div>
              <div
                className="self-stretch text-neutral-700 text-[12px] tracking-wider text-center w-[1000px] relative bottom-[240px]"
                style={montserrat.style}
              >
                <img
                  className="w-[240px] h-[240px] relative right-[-320px] top-[130px] z-99"
                  src="/images/clock.png"
                />
                <div className="relative left-[10px]">posted 2 day ago</div>
              </div>
            </div>
            <div className="flex gap-8 relative left-[100px]">
              <div className="bg-white w-[281px] h-[77px] rounded-xl text-center border-[#BF5F82] border relative bottom-[350px] drop-shadow-lg">
                <div
                  className="text-[16px] relative top-[10px]"
                  style={montserrat.style}
                >
                  Category
                </div>
                <div
                  className="text-[22px] relative top-[10px] left-[10px]"
                  style={montserrat.style}
                >
                  Manufacturing
                </div>
                <img
                  className="w-[290px] h-[290px] relative right-[95px] bottom-[150px] z-99"
                  src="/images/Manufacturing.png"
                />
              </div>
              <div className="bg-white w-[208px] h-[77px] rounded-xl text-center border-[#BF5F82] border relative bottom-[350px] drop-shadow-lg">
                <div
                  className="text-[16px] relative top-[10px]"
                  style={montserrat.style}
                >
                  Type
                </div>
                <div
                  className="text-[22px] relative top-[10px] left-[10px]"
                  style={montserrat.style}
                >
                  Full time
                </div>
                <img
                  className="w-[290px] h-[290px] relative right-[60px] bottom-[152px] z-99"
                  src="/images/fulltime.png"
                />
              </div>
              <div className="bg-white w-[254px] h-[77px] rounded-xl text-center border-[#BF5F82] border relative bottom-[350px] drop-shadow-lg">
                <div
                  className="text-[16px] relative top-[10px]"
                  style={montserrat.style}
                >
                  Salary
                </div>
                <div
                  className="text-[22px] relative top-[10px] left-[10px]"
                  style={montserrat.style}
                >
                  2,000 - 2,500
                </div>
                <img
                  className="w-[290px] h-[290px] relative right-[80px] bottom-[152px] z-99"
                  src="/images/salary.png"
                />
              </div>
            </div>

            <div
              className="text-[#BF5F82] text-[24px] w-full relative bottom-[310px] flex flex-col gap-3"
              style={montserrat.style}
            >
              Complete your application
              <div className="text-[#373737] text-[10px]">
                SEND YOUR CV UPDATED
                <div className="text-[#616161] text-[14px] flex gap-5">
                  <span>
                    <input
                      type="radio"
                      id="all"
                      name="filter-your-candidates"
                      value="all"
                      className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                    />
                    Use current CV
                  </span>
                  <span>
                    <input
                      type="radio"
                      id="waiting"
                      name="filter-your-candidates"
                      value="waiting"
                      className="scale-150 mr-[6px] relative top-[2px] accent-pink-500"
                    />
                    Upload new CV
                  </span>
                </div>
              </div>
              <div>
                <div className="relative flex ">
                  {/* <Image
                    src="/upload-icon.png"
                    width={20}
                    height={20}
                    alt="arrow"
                    className="absolute left-[10px] top-[8px]"
                  /> */}
                  <input
                    type="file"
                    name="attachment"
                    className="customfile text-sm "
                  />
                </div>
                <p className="text-[10px] text-[#8E8E8E] ">
                  Only PDF.Max size 5MB
                </p>
              </div>
              <div className="text-[#373737] text-[10px]">
                PROFESSIONAL EXPERIENCE (TAKEN FROM YOUR PROFILE)
                <br />
                <textarea
                  className="w-[500px] h-[80px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
                  type="text"
                  id="experience"
                  name="experience"
                  placeholder="..."
                />
              </div>
              <div className="text-[#373737] text-[10px]">
                WHY ARE YOU INTERESTED IN WORKING AT THE COMPANY NAME SA
                <br />
                <textarea
                  className="w-[500px] h-[80px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
                  type="text"
                  id="experience"
                  name="experience"
                  placeholder="Mention things about The Company Name SA that excite you. Why would you be a good candidate?"
                />
                <p className="text-[12px] text-[#8E8E8E] ">
                  Between 50 and 1000 characters
                </p>
              </div>
            </div>
            <div className="relative left-[380px] bottom-[250px]">
              <div
                className="text-white bg-[#f48fb1] w-[233px] h-[56px] text-[14px] rounded-2xl ralative text-center"
                style={inter.style}
              >
                <img
                  className="w-[240px] h-[240px] absolute right-[85px] top-[-93px] z-99"
                  src="/images/letter.png"
                />
                <div className="relative right-[-15px] top-[17px] tracking-wider">
                  SEND APPLICATION
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
