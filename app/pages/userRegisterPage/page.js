"use client";

import Image from "next/image";
import "tailwindcss/tailwind.css";
import Header from "../../components/Navbar/Header";
import { useState } from "react";
import supabase from "../../../utils/supabase/supabase";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const { user, error } = await supabase.from("user").insert([
        {
          email,
          password,
        },
      ]);
      // console.log(email, password);

      if (error) {
        console.error("Error registering user", error.message);
        return false;
      }
      console.log("User registered successfully:", user);
    } catch (error) {
      console.error("Error registering user", error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="wrapper ml-[400px] mb-[100px] relative">
        <h1 className="text-[48px] mb-4">Good choice! </h1>
        <h2 className="text-[20px] mb-8">Create a new account as...</h2>
        <div className="status-user text-[14px] flex gap-[6px] mb-[36px]">
          <div className="mr-1">
            <Link href="/pages/userRegisterPage">
              <p>PROFESSIONAL</p>
              <hr className="w-[100px] border-b-[3px] border-[#F48FB1] " />
            </Link>
          </div>
          <div>
            <Link href="/pages/recruiterSignUp">
              <p className="text-[#bdbdbd]">RECRUITER</p>
              <hr className="w-[70px] border-b-[3px] border-[#bdbdbd]" />
            </Link>
          </div>
        </div>
        <div className="status-login flex flex-row mb-5">
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
          <div className="secound-status ml-[10px] relative pl-[45px] text-[#bdbdbd]">
            <p className="text-[10px]">IN PROGRESS</p>
            <p className="text-[18px]">Personal</p>
            <p className="text-[18px]">information</p>
            <Image
              className="absolute top-1 left-0"
              src="/2-grey.png"
              width={35}
              height={35}
              alt="number2 "
            />
          </div>
          <div className="thrid-status ml-[10px] relative pl-[45px] text-[#bdbdbd]">
            <p className="text-[10px]">IN PROGRESS</p>
            <p className="text-[18px]">Professional</p>
            <p className="text-[18px]">information</p>
            <Image
              className="absolute top-1 left-0"
              src="/3-grey.png"
              width={35}
              height={35}
              alt="number3"
            />
          </div>
        </div>
        <div className="input-information">
          <p>EMAIL</p>
          <input
            className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            placeholder="some.user@mail.com"
          />
          <p>PASSWORD</p>
          <input
            className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
            type="password"
            placeholder="******"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <p>PASSWORD CONFIRMATION</p>
          <input
            placeholder="******"
            className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button
          type="submit"
          className="p-2 w-20 h-10 bg-[#F48FB1] text-white mt-4 ml-auto rounded-2xl text-sm relative "
          onClick={handleRegister}
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
        <Image
          src="/woman.png"
          width={435}
          height={966}
          alt="woman"
          className="absolute left-[550px] top-[275px]"
        />
      </div>
    </>
  );
}
