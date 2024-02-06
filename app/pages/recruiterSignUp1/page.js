"use client";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import StepperForm from "../../components/RecruiterSignUpFrom/StepperForm";
import { Fragment } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";
import LoginInfo from "@/app/components/RecruiterSignUpFrom/LoginInfo";
import { useContext, useState } from "react";
import { RecruiterContext } from "../../context/recruiterContext";

const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ weight: "400", preload: false });

export default function Page() {
  const { addCompany, addEmail, addPassword } = useContext(RecruiterContext);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setContextState = () => {
    addCompany(company);
    addEmail(email);
    addPassword(password);
  };
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
          {/* ช่องกรอก Form */}
          <div style={inter.style} className="status-login flex flex-row mb-5">
            <div className="first-status relative pl-[45px] ">
              <p className="text-[10px] ">IN PROGRESS</p>
              <p className="text-[18px]">Login</p>
              <p className="text-[18px]">information</p>
              <Image
                src="/1-pink.png"
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
                src="/2-grey.png"
                width={35}
                height={35}
                alt="number2 "
              />
            </div>
          </div>
          <div style={inter.style} className="input-information">
            <p className="text-[10px]">COMPANY NAME</p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="text"
              id="company"
              name="company"
              placeholder="My Company S.A"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
            <p className="text-[10px]"> EMAIL </p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="email"
              id="email"
              name="email"
              placeholder="some.user@mail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <p className="text-[10px]"> PASSWORD</p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p className="text-[10px]">PASSWORD CONFIRMATION</p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="password"
              id="confirm-password"
              name="password"
              placeholder="******"
            />
            <Link
              href={{
                pathname: "/pages/recruiterSignUp1/recruiterSignUp2",
              }}
            >
              <button
                className="p-2 w-20 h-10 bg-[#F48FB1] text-white mt-4  rounded-2xl text-sm relative"
                onClick={setContextState}
              >
                NEXT
                <Image
                  src="/arrow-right.png"
                  width={20}
                  height={20}
                  alt="arrow"
                  className="absolute right-[2px] bottom-[10px]"
                />
              </button>
            </Link>
          </div>
          {/* Woman Picture */}
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
