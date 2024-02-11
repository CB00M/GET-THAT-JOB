"use client";
import React from "react";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import createSupabaseServerClient from "@/utils/supabase/server";
import Logout from "../ProfessionalSidebar/logout";
import handleLogout from "@/app/login/actions";
import { redirect } from "next/dist/server/api-utils";
import { createClient } from "@supabase/supabase-js";
import { Router } from "next/navigation";

const inter = Inter({ weight: "400", preload: false });
const montserrat = Montserrat({ subsets: ["latin"] });

const supabase = createClient(
  "https://xldcnixdyucdznvziubx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsZGNuaXhkeXVjZHpudnppdWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3MDEzMzEsImV4cCI6MjAyMjI3NzMzMX0.8oPe4EzhETnEG_9YloGRei_hoMNqEsd53SHAUg8LCRw"
);

export default function SidebarRecruiter() {
  const router = useRouter();
  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      alert("Signed out successfully!");
      // Redirect to the home page or another page after signout
      router.push("/");
    }
  };

  return (
    <div className="self-stretch py-8 bg-neutral-200 flex-col justify-between items-start inline-flex ">
      <div className="flex-col justify-start items-start flex">
        <div className="px-4 pb-[32px] flex-col justify-center items-start flex ">
          <img className="w-[136px] h-10" src="/images/gtj-logo.png" />
        </div>
        <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-100 justify-center items-center flex">
          <img className="w-[24px] h-[24px]" src="/images/jobposting.svg" />
          <div
            className="grow text-neutral-700 leading-normal "
            style={inter.style}
          >
            Job Postings
          </div>
        </div>
        <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex ">
          <img className="w-[24px] h-[24px]" src="/images/createnewjob.svg" />
          <div
            className="grow text-zinc-600 leading-normal "
            style={inter.style}
          >
            Create New Job
          </div>
        </div>
        <div className="w-60 h-10 px-4 p-[26px] gap-2 bg-neutral-200 justify-center items-center flex ">
          <img className="w-[24px] h-[24px]" src="/images/profile.svg" />
          <div
            className="grow text-zinc-600 leading-normal"
            style={inter.style}
          >
            Profile
          </div>
        </div>
        <div className="w-60 px-4 py-3 bg-neutral-200 justify-start items-start gap-2 inline-flex">
          <img className="w-[24px] h-[24px]" src="/images/logout.svg" />
          <div className=" text-zinc-600 leading-normal " style={inter.style}>
            <button onClick={handleSignout}>Log out</button>
          </div>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-3 inline-flex w-60 px-4 ">
        <div
          className="text-zinc-600 text-xs leading-none"
          style={montserrat.style}
        >
          © 202X - Get That Job
        </div>
      </div>
    </div>
  );
}
