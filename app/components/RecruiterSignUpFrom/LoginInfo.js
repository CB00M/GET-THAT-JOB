import "tailwindcss/tailwind.css";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ weight: "400", preload: false });

function LoginInfo() {
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
          id="company-name"
          name="company-name"
          placeholder="My Company S.A"
        />
        <p className="text-[10px]"> EMAIL </p>
        <input
          className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
          type="email"
          id="email"
          name="email"
          placeholder="some.user@mail.com"
        />
        <p className="text-[10px]"> PASSWORD</p>
        <input
          className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
          type="password"
          id="password"
          name="password"
          placeholder="******"
        />
        <p className="text-[10px]">PASSWORD CONFIRMATION</p>
        <input
          className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
          type="password"
          id="confirm-password"
          name="password"
          placeholder="******"
        />
      </div>
    </>
  );
}

export default LoginInfo;
