"use client";
import "tailwindcss/tailwind.css";
import { Montserrat, Inter } from "next/font/google";
import Sidebarr from "@/app/pages/yourApplications/component/Sidebarr";
import Main from "@/app/pages/yourApplications/component/Main";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function page() {
  return (
    <>
      <div className="w-full h-full bg-neutral-100  items-start inline-flex">
        {/*Sidebar */}
        <Sidebarr />
        {/*your application */}
        <Main />
      </div>
    </>
  );
}
