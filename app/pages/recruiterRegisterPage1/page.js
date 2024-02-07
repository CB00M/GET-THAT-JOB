"use client";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import Header from "../../components/Navbar/Header";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [companyPasswordConfirm, setCompanyPasswordConfirm] = useState("");

  /*const handleInputCompanyLogin = async (event) => {
    event.preventDefault();
  };*/

  const handleFormSubmit = () => {
    // Validate company name (3-20 characters)
    if (companyName.length < 3 || companyName.length > 20) {
      alert("Company name must be between 3 and 20 characters.");
      return;
    }

    // Validate email (contains @ and .com)
    if (!companyEmail.includes("@") || !companyEmail.includes(".com")) {
      alert("The email format is invalid.");
      return;
    }

    // Validate password (at least 5 characters)
    if (companyPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (companyPasswordConfirm.length < 6) {
      alert("Password confirmation must be at least 6 characters.");
      return;
    }

    // Validate password confirmation
    if (companyPassword !== companyPasswordConfirm) {
      alert("Password and password confirmation do not match.");
      return;
    }

    // Proceed to the next page
    // You can replace "/pages/recruiterRegisterPage2" with the actual path you want to navigate to
    window.location.href = "/pages/recruiterRegisterPage2";
  };

  return (
    <>
      <Header />
      <div className="wrapper ml-[400px] mb-[100px] relative">
        <h1 className="text-[48px] mb-4">Good choice!</h1>
        <h2 className="text-[20px] mb-8">Create a new account as...</h2>
        <div className="status-user text-[14px] flex gap-[6px] mb-[36px]">
          <div className="mr-1">
            <Link href="/pages/userRegisterPage1">
              <p className="text-[#bdbdbd]">PROFESSIONAL</p>
              <hr className="w-[100px] border-b-[3px] border-[#bdbdbd]  " />
            </Link>
          </div>
          <div>
            <p>RECRUITER</p>
            <hr className="w-[70px] border-b-[3px] border-[#F48FB1]" />
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
        <form>
          <div className="input-information">
            <p>COMPANY NAME</p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="text"
              id="companyName"
              name="companyName"
              placeholder="My Company S.A"
              onChange={(event) => {
                setCompanyName(event.target.value);
              }}
              value={companyName}
              minLength="1"
              maxLength="20"
              pattern="[a-zA-Z0-9._%+-]"
              title="Enter your company name"
            />
            <p>EMAIL</p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1 "
              type="email"
              id="companyEmail"
              name="companyEmail"
              placeholder="some.user@mail.com"
              onChange={(event) => {
                setCompanyEmail(event.target.value);
              }}
              value={companyEmail}
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              title="Enter a valid email address"
            />
            <p>PASSWORD</p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="password"
              id="companyPassword"
              name="companyPassword"
              placeholder="******"
              onChange={(event) => {
                setCompanyPassword(event.target.value);
              }}
              value={companyPassword}
              minLength="6"
              pattern="[a-zA-Z0-9._%+-]"
              title="Enter a password with a minimum length of 6 characters."
            />
            <p>PASSWORD CONFIRMATION</p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="password"
              id="companyPasswordConfirm"
              name="companyPasswordConfirm"
              placeholder="******"
              onChange={(event) => {
                setCompanyPasswordConfirm(event.target.value);
              }}
              value={companyPasswordConfirm}
              minLength="6"
              pattern="[a-zA-Z0-9._%+-]"
              title="Please confirm your password by entering it again."
            />
          </div>

          <button
            id="nextButton"
            type="button"
            className="p-2 w-20 h-10 bg-[#F48FB1] text-white mt-4  rounded-2xl text-sm relative ml-[120px] "
            onClick={handleFormSubmit}
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
        </form>
        <Image
          src="/woman.png"
          width={400}
          height={400}
          alt="woman"
          className="absolute top-[275px] ml-[550px] "
        />
      </div>
    </>
  );
}
