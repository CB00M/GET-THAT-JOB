import Image from "next/image";
import "tailwindcss/tailwind.css";
import Header from "@/app/components/Header";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <div className="wrapper ml-[400px] ">
        <h1 className="text-[48px] mb-4">Good choice!</h1>
        <h2 className="text-[20px] mb-8">Create a new account as...</h2>
        <div className="status-user text-[14px] flex gap-[6px] mb-[36px]">
          <div className="mr-1 text-[#bdbdbd]">
            <p>PROFESSIONAL</p>
            <hr className="w-[100px] border-b-[3px]  border-[#bdbdbd]" />
          </div>
          <div>
            <p>RECRUITER</p>
            <hr className="w-[70px] border-b-[3px] border-[#F48FB1]" />
          </div>
        </div>
        <div className="status-login flex flex-row mb-5">
          <div className="first-status relative pl-[45px] ">
            <p className="text-[10px] ">DONE!</p>
            <p className="text-[18px]">Login</p>
            <p className="text-[18px]">information</p>
            <Image
              src="/1-grey.png"
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
              src="/2-pink.png"
              width={35}
              height={35}
              alt="number2 "
            />
          </div>
        </div>
        <div className="input-information">
          <p className="text-[10px] mb-5 text-[#616161]">
            YOU CAN COMPLETE THIS INFORMATION LATER BUT WE <br /> RECCOMEND YOU
            TO DO IT NOW
          </p>
          <p className="text-[10px] text-[#616161]">COMPANY WEBSITE</p>
          <input
            className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1 mb-2"
            type="text"
            id="website"
            name="website"
            placeholder="http://www.mycompany.sa"
          />
          <p className="text-[10px] text-[#616161]">ABOUT THE COMPANY</p>
          <textarea
            className="w-[500px] h-[80px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
            type="text"
            id="experience"
            name="experience"
            placeholder="My Company SA has the vision to change thw way how..."
          />
          <p className="text-[10px] text-[#8E8E8E] mb-2">
            Between 100 and 2000 characters
          </p>
        </div>
        <p className="text-[10px] text-[#616161] ">UPLOAD THE COMPANY LOGO</p>
        <div className="flex flex-row items-center">
          <button
            type="submit"
            className="p-2 w-[150px] h-[50px] bg-[#F48FB1] text-white rounded-2xl text-sm pr-0 relative"
          >
            Choose a file
            <Image
              src="/upload-icon.png"
              width={20}
              height={20}
              alt="arrow"
              className="absolute left-[10px] bottom-[15px]"
            />
          </button>
          <p className="text-[10px] text-[#616161] ml-[10px]">No file chose</p>
        </div>
        <p className="text-[10px] text-[#8E8E8E] ">Only PDF.Max size 5MB</p>
        <div className="change-page ">
          <button
            type="submit"
            className="m-5 ml-[100px] p-2 w-[120px] h-10 border border-[#F48FB1] mt-4 rounded-2xl text-sm relative "
          >
            SKIP THIS!
            <Image
              src="/arrow-right.png"
              width={20}
              height={20}
              alt="arrow"
              className="absolute right-[2px] bottom-[10px]"
            />
          </button>
          <button
            type="submit"
            className="m-5 p-2 w-[120px] h-10 bg-[#F48FB1] text-white mt-4 ml-auto rounded-2xl text-sm relative "
          >
            FINISH
            <Image
              src="/arrow-right.png"
              width={20}
              height={20}
              alt="arrow"
              className="absolute right-[2px] bottom-[10px]"
            />
          </button>
        </div>
        <Image
          src="/woman.png"
          width={400}
          height={400}
          alt="woman"
          className="absolute right-[200px] top-[350px]"
        />
      </div>
    </>
  );
}
