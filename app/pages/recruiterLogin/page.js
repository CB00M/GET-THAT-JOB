"use client";

import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import "../../globals.css";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";
import Image from "next/image";
import logo from "../../../public/images/man.svg";
import Link from "next/link";
import Header from "../../components/Navbar/Header";
import {
  passwordRecruiterUsers,
  emailFromRecruiterUsers,
  handleLoginRecruiter,
} from "../../login/actions";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ weight: "400", preload: false });

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const handleEmail = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handlesubmit = async (event) => {
    event.preventDefault();

    const checkEmail = await emailFromRecruiterUsers(email);
    if (!checkEmail) {
      setEmailError("Invalid email");
      return;
    }

    const checkPassword = await passwordRecruiterUsers(password);
    if (!checkPassword) {
      setPasswordError("Invalid password");
      return;
    }

    await handleLoginRecruiter({ email, password });
    router.push("/pages/jobPosting");
  };

  return (
    <>
      <Header />
      <div className="flex w-full justify-around items-start bg-[#F5F5F6] p-10">
        <form
          onSubmit={handlesubmit}
          style={montserrat.style}
          className="ml-52"
        >
          <div className="text-[#373737]">
            <h2 className="text-5xl ">Welcome back</h2>
            <p className="font-medium text-xl mt-5">
              Login to you account as...
            </p>
          </div>

          <div
            style={inter.style}
            className="text-sm tracking-widest mt-8 font-medium p-2"
          >
            <Link
              href="/pages/userLogin"
              className="inline-block h-7 border-b-[3px] text-[#8E8E8E] border-[#BDBDBD] "
            >
              PROFESSIONAL
            </Link>
            <Link
              href="/pages/recruiterLogin"
              className="inline-block h-7 ml-3 border-b-[3px] border-[#F48FB1]"
            >
              RECRUITER
            </Link>
          </div>
          <div
            style={inter.style}
            className="flex flex-col p-2 tracking-widest"
          >
            <label htmlFor="email" className="text-[10px]">
              EMAIL
            </label>
            <input
              className="w-full h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              placeholder="some.user@mail.com"
              id="email"
              type="email"
              name="email"
              onChange={handleEmail}
              value={email}
            />
            <label htmlFor="password" className="text-[10px] mt-3">
              PASSWORD
            </label>
            <input
              className="w-full h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              placeholder="******"
              id="password"
              type="password"
              name="password"
              onChange={handlePassword}
              value={password}
            />
            <button
              type="submit"
              className="p-2 w-20 h-10 bg-[#F48FB1] text-white mt-4 ml-auto rounded-2xl text-sm"
            >
              LOGIN
            </button>
          </div>
        </form>
        <div>
          <Image src={logo} className="w-89 h-90" />
        </div>
      </div>
    </>
  );
}

export default Page;
