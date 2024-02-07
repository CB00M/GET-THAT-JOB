"use client";

import React from "react";
import "tailwindcss/tailwind.css";
import "../../globals.css";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";
import Image from "next/image";
import logo from "../../../public/images/man.svg";
import Link from "next/link";
import Header from "../../components/Navbar/Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  passwordProfessionalUsers,
  emailFromProfessionalUsers,
  handleLoginProfessional,
} from "../../login/actions";

const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ weight: "400", preload: false });

// const supabase = createClient(
//   "https://xldcnixdyucdznvziubx.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZGNuaXhkeXVjZHpudnppdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3MDEzMzEsImV4cCI6MjAyMjI3NzMzMX0.8oPe4EzhETnEG_9YloGRei_hoMNqEsd53SHAUg8LCRw"
// );

export default function LoginPage() {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const checkEmail = await emailFromProfessionalUsers(email);
    if (!checkEmail) {
      setEmailError("Invalid email");
      return;
    }

    const checkPassword = await passwordProfessionalUsers(password);
    if (!checkPassword) {
      setPasswordError("Invalid password");
      return;
    }

    await handleLoginProfessional({ email, password });
    router.push("/pages/professional");
  };

  return (
    <>
      <Header />
      <div className="flex w-full justify-around items-start bg-[#F5F5F6] p-10">
        <form
          style={montserrat.style}
          className="ml-52"
          onSubmit={handleSubmit}
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
              className="inline-block h-7 border-b-[3px] border-[#F48FB1]"
            >
              PROFESSIONAL
            </Link>
            <Link
              href="/pages/recruiterLogin"
              className="inline-block ml-3 border-b-[3px] text-[#8E8E8E] border-[#BDBDBD] h-7"
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
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              required
            />
            <label htmlFor="password" className="text-[10px] mt-3">
              PASSWORD
            </label>
            <input
              className="w-full h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              placeholder="******"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              required
            />
            <button className="p-2 w-20 h-10 bg-[#F48FB1] text-white mt-4 ml-auto rounded-2xl text-sm">
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
