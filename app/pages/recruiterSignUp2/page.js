"use client";

import "tailwindcss/tailwind.css";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";
import { Fragment } from "react";
import { useState, useContext } from "react";
import { RecruiterContext } from "@/app/context/recruiterContext";
import { register } from "./api/recruiterRegister";
import "../../globals.css";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

const initialState = { success: false, message: null };

const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ weight: "400", preload: false });

export default function CompanyInfo() {
  const router = useRouter();
  const [state, formAction] = useFormState(register, initialState);

  const { company, email, password } = useContext(RecruiterContext);
  const [website, setWebsite] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");

  const handleSubmit = () => {
    setWebsite(website);
    setAboutCompany(aboutCompany);
    console.log(company, email, password, website, aboutCompany);

    setTimeout(() => {
      router.push("/pages/recruiterLogin");
    }, 5000);
  };

  // let keepDataD = JSON.parse(localStorage.getItem("keepData"));
  // console.log(keepDataD);

  return (
    <Fragment>
      <section className="flex w-full justify-around items-start  bg-[#F5F5F6]">
        <div className="ml-[150px]">
          <h1 style={montserrat.style} className="text-[48px] mb-4">
            Good choice!
          </h1>
          <h2 style={montserrat.style} className="text-[20px] mb-8">
            Create a new account as...
          </h2>
          <div
            style={inter.style}
            className="status-user text-[14px] flex gap-[6px] mb-[36px]"
          >
            <Link href="/pages/userRegisterPage1">
              <div className="mr-1">
                <p className="text-[#bdbdbd]">PROFESSIONAL</p>
                <hr className="w-[100px] border-b-[3px] border-[#bdbdbd]  " />
              </div>
            </Link>
            <Link href="/pages/recruiterSignUpPage">
              <div>
                <p>RECRUITER</p>
                <hr className="w-[70px] border-b-[3px] border-[#F48FB1]" />
              </div>
            </Link>
          </div>
          <div className="status-login flex flex-row mb-5">
            <div className="first-status relative pl-[45px] ">
              <p className="text-[10px] ">DONE!</p>
              <p className="text-[18px]">Login</p>
              <p className="text-[18px]">information</p>
              <Image
                src="/1-grey.png"
                width={35}
                height={35}
                alt="number1"
                className="absolute top-1 left-0"
              />
            </div>
            <div className="secound-status ml-[10px] relative pl-[45px]">
              <p className="text-[10px]">IN PROGRESS</p>
              <p className="text-[18px]">Company</p>
              <p className="text-[18px]">information</p>
              <Image
                className="absolute top-1 left-0"
                src="/2-pink.png"
                width={35}
                height={35}
                alt="number2 "
              />
            </div>
          </div>
          <form action={formAction}>
            <div className="input-information">
              <p className="text-[10px] mb-5 text-[#616161]">
                YOU CAN COMPLETE THIS INFORMATION LATER BUT WE <br /> RECCOMEND
                YOU TO DO IT NOW
              </p>

              <p className="text-[10px] text-[#616161]">COMPANY WEBSITE</p>
              <input name="email" value={email} hidden />
              <input name="password" value={password} hidden />
              <input name="company-name" value={company} hidden />
              <input
                className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1 mb-2"
                type="text"
                id="website"
                name="website"
                placeholder="http://www.mycompany.sa"
                value={website}
                onChange={(event) => {
                  setWebsite(event.target.value);
                }}
              />
              <p className="text-[10px] text-[#616161]">ABOUT THE COMPANY</p>
              <input
                className="w-[500px] h-[80px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
                type="text"
                id="aboutCompany"
                name="aboutCompany"
                placeholder="My Company SA has the vision to change thw way how..."
                value={aboutCompany}
                onChange={(event) => {
                  setAboutCompany(event.target.value);
                }}
              />

              <p className="text-[10px] text-[#8E8E8E] mb-2">
                Between 100 and 2000 characters
              </p>
            </div>
            <div>
              <label className="tracking-wider text-[10px] text-[#616161] ">
                UPLOAD THE COMPANY LOGO
              </label>
              <br />
              <div className="relative">
                <Image
                  src="/images/uplode-icon.svg"
                  width={20}
                  height={20}
                  alt="arrow"
                  className="absolute left-[10px] top-[8px]"
                />
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
            <button
              onClick={handleSubmit}
              className="m-5 ml-[100px] p-2 w-[120px] h-10 border border-[#F48FB1] hover:bg-[#FFC1E3] mt-4 rounded-2xl text-sm relative"
            >
              SKIP THIS!
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="m-5 p-2 w-[120px] h-10 bg-[#F48FB1] hover:bg-pink-500 active:bg-pink-700 text-white mt-4 ml-auto rounded-2xl text-sm relative"
            >
              FINISH
              <Image
                src="/arrow-right.png"
                width={20}
                height={20}
                alt="arrow"
                className="absolute right-[2px] bottom-[10px]"
              />
            </button>

            {state.message && (
              <div className="bg-red-400 text-xl text-white ml-32  p-5 w-fit rounded-xl">
                Error:{state.message}
              </div>
            )}
            {state.success && (
              <div className="bg-green-400 text-xl text-white ml-32 p-5 w-fit rounded-xl">
                Register Successful
              </div>
            )}
          </form>
        </div>
        <div>
          <Image
            src="/woman.png"
            width={435}
            height={966}
            alt="woman"
            className="mt-[265px]"
          />
        </div>
      </section>
    </Fragment>
  );
}
