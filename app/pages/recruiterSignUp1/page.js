"use client";

import Image from "next/image";
import "tailwindcss/tailwind.css";
import { Fragment } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";
import { useContext, useState } from "react";
import { RecruiterContext } from "../../context/recruiterContext";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ weight: "400", preload: false });

export default function Page() {
  const router = useRouter();
  const { addCompany, addEmail, addPassword } = useContext(RecruiterContext);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const recruiterSchema = yup.object().shape({
    company: yup.string("Please assign your company name").required(),
    email: yup.string().email("invalid email").required(),
    password: yup
      .string()
      .required()
      .min(5, "Please Enter password at least 5 letters")
      .max(12, "Please Enter less than 12 letters"),
    confirmPassword: yup
      .string()
      .required("This field id required.")
      .oneOf([yup.ref("password"), null, " "]),
  });

  const createRecruiter = async (event) => {
    event.preventDefault();
    const formData = {
      company: company,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    const isValid = await recruiterSchema.isValid(formData);
    console.log(formData);
    console.log(isValid);

    if (formData.password.length <= 5) {
      alert("Please Enter password at least 5 letters");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match.");
    }
    if (isValid) {
      setContextState();
      router.push("/pages/recruiterSignUp2");
    }
  };

  const setContextState = () => {
    addCompany(company);
    addEmail(email);
    addPassword(password);
  };

  /*let keepData = { company: company, email: email };
  let keepDatas = JSON.stringify(keepData);
  localStorage.setItem("keepData", keepDatas);*/

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
          <form onSubmit={createRecruiter}>
            <div style={inter.style} className="input-information">
              <p className="text-[10px]">COMPANY NAME</p>
              <input
                className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
                type="text"
                id="company"
                name="company"
                placeholder="My Company S.A"
                value={company}
                required
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
                required
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
                required
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
                required
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="******"
              />
              <br />
              <button className="p-2 w-20 h-10 bg-[#F48FB1] hover:bg-pink-500 active:bg-pink-700 text-white mt-4  rounded-2xl text-sm relative">
                NEXT
                <Image
                  src="/arrow-right.png"
                  width={20}
                  height={20}
                  alt="arrow"
                  className="absolute right-[2px] bottom-[10px]"
                />
              </button>
            </div>
          </form>
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
