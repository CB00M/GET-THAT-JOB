import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useContext, useState } from "react";
import { RecruiterContext } from "@/app/context/recruiterContext";
const inter = Inter({ weight: "400", preload: false });

function LoginInfo() {
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
    <>
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
        <button
          className="p-2 w-20 h-10 bg-[#F48FB1] text-white mt-4  rounded-2xl text-sm relative ml-[120px]"
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
      </div>
    </>
  );
}

export default LoginInfo;
