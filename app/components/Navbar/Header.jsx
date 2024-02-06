"use client";
import "tailwindcss/tailwind.css";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full  flex justify-around shadow-lg shadow-gray-300">
      <Link href="/">
        <Image
          src="/images/get-that-job.png"
          width={160}
          height={30}
          className="p-2 mr-68"
        />
      </Link>
      <div className="flex ml-72 ">
        <div className="mx-2 my-2 p-1">
          <Link
            href={{
              pathname: "/pages/recruiterSignUp",
            }}
          >
            <Image
              src="/images/signup.png"
              width={127}
              height={55}
              className="hover:bg-[#FFC1E3] rounded-xl active:bg-[#eabfcd] "
            />
          </Link>
        </div>
        <div className="mx-2 my-2 p-1">
          <Link
            href={{
              pathname: "/pages/userLogin",
            }}
          >
            <Image
              src="/images/login.png"
              height={40}
              width={112}
              className="hover:bg-[#FFC1E3] rounded-xl active:bg-[#eabfcd] "
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
