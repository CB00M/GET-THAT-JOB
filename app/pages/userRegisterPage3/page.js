"use client";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import Header from "@/app/components/Navbar/Header";
import { useState } from "react";
import React from "react";
import { register } from "./api/action";
import Link from "next/link.js";
import "../../globals.css";
import { useContext } from "react";
import { ProfessionalContext } from "@/app/context/professionalContext";
import { useFormState } from "react-dom";

const initialState = { success: false, message: null };

export default function RegisterPage() {
  const [state, formAction] = useFormState(register, initialState);
  const { email, password, name, phoneNumber, birthdate, linkedin } =
    useContext(ProfessionalContext);
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");

  const handleSubmit = () => {
    setTitle(title);
    setExperience(experience);
    setEducation(education);
  };

  return (
    <>
      <Header />

      <div className="wrapper ml-[400px] relative ">
        <h1 className="text-[48px] mb-4">Good choice!</h1>
        <h2 className="text-[20px] mb-8">Create a new account as...</h2>
        <div className="status-user text-[14px] flex gap-[6px] mb-[36px]">
          <div className="mr-1">
            <p>PROFESSIONAL</p>
            <hr className="w-[100px] border-b-[3px] border-[#F48FB1] " />
          </div>
          <div>
            <Link href="/pages/recruiterSignUp1">
              <p className="text-[#bdbdbd]">RECRUITER</p>
              <hr className="w-[70px] border-b-[3px] border-[#bdbdbd]" />
            </Link>
          </div>
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
            <p className="text-[10px]">DONE!</p>
            <p className="text-[18px]">Personal</p>
            <p className="text-[18px]">information</p>
            <Image
              className="absolute top-1 left-0"
              src="/2-black.png"
              width={35}
              height={35}
              alt="number2 "
            />
          </div>
          <div className="thrid-status ml-[10px] relative pl-[45px]">
            <p className="text-[10px]">IN PROGRESS</p>
            <p className="text-[18px]">Professional</p>
            <p className="text-[18px]">information</p>
            <Image
              className="absolute top-1 left-0"
              src="/3-pink.png"
              width={35}
              height={35}
              alt="number3"
            />
          </div>
        </div>

        <form action={formAction}>
          <div className="input-information">
            <p className="text-[10px] mb-5 text-[#616161]">
              YOU CAN COMPLETE THIS INFORMATION LATER BUT WE <br /> RECCOMEND
              YOU TO DO IT NOW
            </p>
            <p className="text-[10px] text-[#616161]">TITLE</p>
            <input name="email" value={email} hidden />
            <input name="password" value={password} hidden />
            <input name="name" value={name} hidden />
            <input name="phoneNumber" value={phoneNumber} hidden />
            <input name="birthdate" value={birthdate} hidden />
            <input name="linkedin" value={linkedin} hidden />
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1 mb-2"
              type="text"
              id="title"
              name="title"
              placeholder="Mechanical administrator..."
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
            <p className="text-[10px] text-[#616161]">
              PROFESSIONAL EXPERIENCE
            </p>
            <textarea
              className="w-[500px] h-[80px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="text"
              id="experience"
              name="experience"
              placeholder="Work 6 year in a bitcoin farm until I decide to change me life.... "
              onChange={(e) => {
                setExperience(e.target.value);
              }}
              value={experience}
            />
            <p className="text-[10px] text-[#8E8E8E]">
              Between 100 and 2000 characters
            </p>
            <p className="text-[10px] text-[#616161] mt-2">EDUCATION</p>
            <textarea
              className="w-[500px] h-[80px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="password"
              id="education"
              name="education"
              placeholder="Major in life experiences with a PHD in procrastination... "
              onChange={(e) => {
                setEducation(e.target.value);
              }}
              value={education}
            />
            <p className="text-[10px] text-[#8E8E8E] mb-2">
              Between 100 and 2000 characters
            </p>
          </div>
          <div>
            <label className="tracking-wider text-[10px] text-[#616161] ">
              UPLOAD/UPDATE YOUR CV
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
              <input type="file" name="CV" className="customfile text-sm " />
            </div>

            <p className="text-[10px] text-[#8E8E8E] ">Only PDF.Max size 5MB</p>
          </div>
          <div className="change-page ">
            <Link href="/pages/userRegisterPage1">
              <button
                type="submit"
                className="m-5 p-2 w-[120px] h-10 bg-[#F48FB1] text-white mt-4 ml-auto rounded-2xl text-sm relative "
              >
                PREVIOUS
                <Image
                  src="/arrow-left.png"
                  width={20}
                  height={20}
                  alt="arrow"
                  className="absolute left-[2px] bottom-[10px]"
                />
              </button>
            </Link>
            <button
              type="submit"
              className="m-5 p-2 w-[120px] h-10 border border-[#F48FB1] mt-4 ml-auto rounded-2xl text-sm relative "
            >
              SKIP THIS!
              <Image
                src="/arrow-right.png"
                width={20}
                height={20}
                alt="arrow"
                className="absolute right-[2px] bottom-[10px]"
              />
            </button>

            <button
              onClick={handleSubmit}
              type="submit"
              className="m-5 p-2 w-[120px] h-10 bg-[#F48FB1] text-white mt-4 ml-auto rounded-2xl text-sm relative "
            >
              FINISH
              <Image
                src="/arrow-right.png"
                width={20}
                height={20}
                alt="arrow"
                className="absolute right-[2px] bottom-[10px]"
              />{" "}
            </button>
            {state.message && (
              <div className="bg-red-500 p-4 w-28 rounded-xl">
                Error:{state.message}
              </div>
            )}
            {state.success && (
              <div className="bg-green-500 p-4 w-28 rounded-xl">
                Register Successful
              </div>
            )}
          </div>
        </form>
        <Image
          src="/woman.png"
          width={400}
          height={400}
          alt="woman"
          className="absolute ml-[600px] mt-[-400px] "
        />
      </div>
    </>
  );
}
