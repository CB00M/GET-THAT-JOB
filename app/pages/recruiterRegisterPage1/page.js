import Image from "next/image";
import "tailwindcss/tailwind.css";
import Header from "@/app/components/header";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <div className="wrapper ml-[400px] mb-[100px] relative">
        <h1 className="text-[48px] mb-4">Good choice!</h1>
        <h2 className="text-[20px] mb-8">Create a new account as...</h2>
        <div className="status-user text-[14px] flex gap-[6px] mb-[36px]">
          <div className="mr-1">
            <p className="text-[#bdbdbd]">PROFESSIONAL</p>
            <hr className="w-[100px] border-b-[3px] border-[#bdbdbd]  " />
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
        <div className="input-information">
          <p>COMPANY NAME</p>
          <input
            className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
            type="text"
            id="company-name"
            name="company-name"
            placeholder="My Company S.A"
          />
          <p>EMAIL</p>
          <input
            className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
            type="email"
            id="email"
            name="email"
            placeholder="some.user@mail.com"
          />
          <p>PASSWORD</p>
          <input
            className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
            type="password"
            id="password"
            name="password"
            placeholder="******"
          />
          <p>PASSWORD CONFIRMATION</p>
          <input
            className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
            type="password"
            id="password"
            name="password"
            placeholder="******"
          />
        </div>
        <button
          type="submit"
          className="p-2 w-20 h-10 bg-[#F48FB1] text-white mt-4  rounded-2xl text-sm relative ml-[120px] "
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
          width={400}
          height={400}
          alt="woman"
          className="absolute right-[200px] top-[275px]"
        />
      </div>
    </>
  );
}
