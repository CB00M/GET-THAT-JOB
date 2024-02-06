"use client";

import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Fragment } from "react";
import { useState, useContext } from "react";
import { RecruiterContext } from "@/app/context/recruiterContext";
import { register } from "./api/recruiterRegister";
export default function CompanyInfo() {
  const { company, email, password } = useContext(RecruiterContext);
  const [website, setWebsite] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");

  const handleSubmit = () => {
    setWebsite(website);
    setAboutCompany(aboutCompany);
    console.log(company, email, password, website, aboutCompany);
  };
  return (
    <Fragment>
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
      <form action={register}>
        <div className="input-information">
          <p className="text-[10px] mb-5 text-[#616161]">
            YOU CAN COMPLETE THIS INFORMATION LATER BUT WE <br /> RECCOMEND YOU
            TO DO IT NOW
          </p>

          <p className="text-[10px] text-[#616161]">COMPANY WEBSITE</p>
          <input name="email" value={email} hidden />
          <input name="password" value={password} hidden />
          <input name="company" value={company} hidden />
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
              src="/upload-icon.png"
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

          <p className="text-[10px] text-[#8E8E8E] ">Only PDF.Max size 5MB</p>
        </div>
        <button className="m-5 ml-[100px] p-2 w-[120px] h-10 border border-[#F48FB1] mt-4 rounded-2xl text-sm relative">
          SKIP THIS!
        </button>

        <button
          type="submit"
          className="m-5 p-2 w-[120px] h-10 bg-[#F48FB1] text-white mt-4 ml-auto rounded-2xl text-sm relative"
          onClick={handleSubmit}
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
      </form>
    </Fragment>
  );
}
