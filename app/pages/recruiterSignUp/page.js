"use client";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import StepperForm from "../../components/RecruiterSignUpFrom/StepperForm";
import { Fragment } from "react";
import Link from "next/link";

export default function Page() {
  return (
    <Fragment>
      <section className="wrapper ml-[400px] mb-[100px] relative">
        <h1 className="text-[48px] mb-4">Good choice!</h1>
        <h2 className="text-[20px] mb-8">Create a new account as...</h2>
        <div className="status-user text-[14px] flex gap-[6px] mb-[36px]">
          <Link href="/pages/userRegisterPage">
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
        <div>
          <Image
            src="/woman.png"
            width={435}
            height={966}
            alt="woman"
            className="absolute left-[550px] top-[275px]"
          />
        </div>
      </section>
    </Fragment>
  );
}
