import Image from "next/image";
import { Montserrat } from "next/font/google";
import "tailwindcss/tailwind.css";
import Header from "./components/Navbar/Header";
import Icons from "./components/Navbar/Icons";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Page() {
  return (
    <>
      {/*พี่บูม*/}
      <Header />
      <div className="flex-col text-center justify-center items-center w-full h-screen bg-[#f7f3f3] mt-3">
        <h1
          className="text-[61px] p-6 font-light leading-[4.5rem]"
          style={montserrat.style}
        >
          The place where
          <br />
          you get{" "}
          <a style={montserrat.style} className="text-[#F48FB1]">
            that{" "}
          </a>{" "}
          job
        </h1>
        <p className="my-4 text-2xl" style={montserrat.style}>
          With our Machine Learning algorithm you will get that job <br />
          in no time. We promise you! Just give us the money and we <br />
          will take care of it.
          <br />
          <button
            style={montserrat.style}
            className="text-sm inline-block border-pink-300 border border-solid p-6 my-8 rounded-3xl text-white bg-[#F48FB1] hover:bg-[#BF5F82] active:bg-[#FFC1E3]"
          >
            <Link href="/pages/userRegisterPage1">CREATE AN ACCOUNT NOW</Link>
          </button>
        </p>
        <div className="inline-block ">
          <Image
            src="/images/humen-group.png"
            alt="human group"
            width={1062}
            height={350}
          />
        </div>
      </div>

      {/*ปิ๊ง */}
      <div className="w-full">
        <div className="w-full h-27 flex">
          <div
            style={montserrat.style}
            className="flex flex-col justify-items-center items-center bg-[#BF5F82] text-[#FFFFFF] w-7/12 py-8 px-4"
          >
            <p className="text-5xl mb-8  w-[640px]">Find your next job</p>
            <p className="text-2xl w-[640px]">
              Our Machine learning algorithm is so good that it's
              <br /> even illegal in some countries. Join us to use our
              <br /> barelly legal algorithm that is actually a group of <br />
              interns that work on our basement.
              <br />
              <br />
              We have a job for you, no matter your background or
              <br /> previous experience. Is sending random memes
              <br /> through chat your only skill? That's ok, we got you,
              <br /> our Rock Star Meme Curator role is here for you.
            </p>
          </div>
          <div className="w-[560px] h-[472px] pl-28 pr-[113px] py-[115px] bg-white justify-center items-center inline-flex relative">
            <img
              className="absolute z-10 left-[150px] top-[120px]"
              src="/images/picture/Magnascope.png"
              width={241}
              height={242}
              alt="Magnascope"
            />
            <img
              className="absolute z-1 left-[350px] top-[120px]"
              src="/images/picture/File.png"
              width={129}
              height={140}
              alt="File"
            />
          </div>
        </div>
        <div
          style={montserrat.style}
          className="w-full px-48 py-16 flex-col justify-start items-center gap-[26px] inline-flex bg-[#E1E2E1]"
        >
          <p className="my-4 text-center text-[#BF5F82] text-5xl font-normal">
            Meet the team
          </p>
          <div className=" flex  flex-row justify-around gap-10">
            <div className="mx-2 my-8">
              <img
                src="/images/picture/ruby-ramirez.png"
                width={180}
                height={180}
                alt="Ruby Ramirez"
              />
              <p className="my-8 text-center text-black text-2xl font-normal ">
                Ruby Ramirez
              </p>
              <Icons />
            </div>
            <div className="mx-2 my-8">
              <img
                src="/images/picture/javier -escribano.png"
                width={180}
                height={180}
                alt="Javier Escribano"
              />
              <p className="my-8 text-center text-black text-2xl font-normal">
                Javier Escribano
              </p>
              <Icons />
            </div>
            <div className="mx-2 my-8">
              <img
                src="/images/picture/francisca-reategui.png"
                width={180}
                height={180}
                alt="Francisca Reategui"
              />
              <p className="my-8 text-center text-black text-2xl font-normal">
                Francisca Reategui
              </p>
              <Icons />
            </div>
            <div className="mx-2 my-8">
              <img
                src="/images/picture/raul-rubina.png"
                width={180}
                height={180}
                alt="Raul Rubina"
              />
              <p className="my-8 text-center text-black text-2xl font-normal">
                Raul Rubina
              </p>
              <Icons />
            </div>
          </div>
        </div>
        <div className="bg-[#E1E2E1] h-[80px] ">
          <p className="text-center py-5 border-t-2 border-[#BF5F82]">
            © 2021 - Get That Job
          </p>
        </div>
      </div>
    </>
  );
}
