"use client";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import StepperForm from "../../components/RecruiterSignUpFrom/StepperForm";
import { Fragment } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ weight: "400", preload: false });

export default function Page() {
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
          <StepperForm />

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
