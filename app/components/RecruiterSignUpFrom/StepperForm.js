"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import LoginInfo from "./LoginInfo";
import CompanyInfo from "./CompanyInfo";
import recruiterSignUp from "../../pages/recruiterSignUp/api/action";
import { Inter } from "next/font/google";

const inter = Inter({ weight: "400", preload: false });

export default function StepperForm() {
  // สร้าง state เก็บข้อมูล input ของผู้ใช้
  const [formData, setFormData] = useState([
    {
      companyName: "",
      email: "",
      password: "",
      companyWebsite: "",
      aboutCompany: "",
    },
  ]);

  // สร้าง state เพื่อเก็บข้อมูล step ปัจจุบัน
  const [currentPage, setCurrentPage] = useState(1);

  // function ที่ใช้ในการเปลี่ยนขั้นตอน
  const nextStep = () => {
    setCurrentPage(currentPage + 1);
  };
  const backStep = () => {
    setCurrentPage(currentPage - 1);
  };

  // function ที่ใช้ในการอัพเดทข้อมูล state
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ฟังก์ชันที่ใช้ในการ submit ข้อมูล
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(formData);
  };

  return (
    <div>
      {currentPage === 1 && (
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
          <form
            onSubmit={nextStep}
            style={inter.style}
            className="input-information"
          >
            <p className="text-[10px]">COMPANY NAME</p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="text"
              id="company-name"
              name="company-name"
              placeholder="My Company S.A"
              defaultValue={formData.companyName}
              onChange={handleChange}
            />
            <p className="text-[10px]"> EMAIL </p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="email"
              id="email"
              name="email"
              placeholder="some.user@mail.com"
              defaultValue={formData.email}
              onChange={handleChange}
            />
            <p className="text-[10px]"> PASSWORD</p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="password"
              id="password"
              name="password"
              placeholder="******"
              defaultValue={formData.password}
              onChange={handleChange}
            />
            <p className="text-[10px]">PASSWORD CONFIRMATION</p>
            <input
              className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="******"
            />{" "}
            <br />
            <button
              className="p-2 w-20 h-10 bg-[#F48FB1] text-white mt-4  rounded-2xl text-sm relative ml-[120px]"
              type="submit"
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
        </>
      )}

      {currentPage === 2 && (
        <>
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
          <form onSubmit={handleSubmit}>
            <div className="input-information">
              <p className="text-[10px] mb-5 text-[#616161]">
                YOU CAN COMPLETE THIS INFORMATION LATER BUT WE <br /> RECCOMEND
                YOU TO DO IT NOW
              </p>

              <p className="text-[10px] text-[#616161]">COMPANY WEBSITE</p>
              <input
                className="w-[350px] h-[36px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1 mb-2"
                type="url"
                id="website"
                name="company-website"
                placeholder="http://www.mycompany.sa"
                defaultValue={formData.companyWebsite}
                onChange={handleChange}
              />
              <p className="text-[10px] text-[#616161]">ABOUT THE COMPANY</p>
              <textarea
                className="w-[500px] h-[80px] rounded-lg text-sm p-2 border border-[#F48FB1] mt-1"
                id="experience"
                name="about-company"
                placeholder="My Company SA has the vision to change thw way how..."
                defaultValue={formData.aboutCompany}
                onChange={handleChange}
              />
              <p className="text-[10px] text-[#8E8E8E] mb-2">
                Between 100 and 2000 characters
              </p>
            </div>
            <div>
              <label className="tracking-wider text-[10px] text-[#616161] ">
                UPLOAD THE COMPANY LOGO
              </label>
              <br />
              <div className="relative">
                <Image
                  src="/upload-icon.png"
                  width={20}
                  height={20}
                  alt="arrow"
                  className="absolute left-[10px] top-[8px]"
                />
                <input
                  type="file"
                  name="attachment"
                  className="customfile text-sm "
                />
              </div>

              <p className="text-[10px] text-[#8E8E8E] ">
                Only PDF.Max size 5MB
              </p>
            </div>
            <button
              onClick={backStep}
              className="m-5 ml-[100px] p-2 w-[120px] h-10 border border-[#F48FB1] mt-4 rounded-2xl text-sm relative"
            >
              BACK
            </button>

            <button
              type="submit"
              className="m-5 p-2 w-[120px] h-10 bg-[#F48FB1] text-white mt-4 ml-auto rounded-2xl text-sm relative"
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
          </form>
        </>
      )}
    </div>
  );
}

// {/* <form action={recruiterSignUp}>
//       {/* Step 1 */}
//       {page === 1 && (
//         <>
//           <div>{getStepContent(page)}</div>
//           <button
//             className="p-2 w-20 h-10 bg-[#F48FB1] text-white mt-4  rounded-2xl text-sm relative ml-[120px]"
//             onClick={handleNext}
//           >
//             NEXT
//             <Image
//               src="/arrow-right.png"
//               width={20}
//               height={20}
//               alt="arrow"
//               className="absolute right-[2px] bottom-[10px]"
//             />
//           </button>
//         </>
//       )}

//       {page === 2 && (
//         <div>
//           {/* Step 2 */}
//           <div>{getStepContent(page)}</div>
//           <button
//             type="submit"
//             className="m-5 ml-[100px] p-2 w-[120px] h-10 border border-[#F48FB1] mt-4 rounded-2xl text-sm relative"
//             onClick={handleSubmit}
//           >
//             SKIP THIS!
//           </button>

//           <button
//             type="submit"
//             className="m-5 p-2 w-[120px] h-10 bg-[#F48FB1] text-white mt-4 ml-auto rounded-2xl text-sm relative"
//           >
//             FINISH
//             <Image
//               src="/arrow-right.png"
//               width={20}
//               height={20}
//               alt="arrow"
//               className="absolute right-[2px] bottom-[10px]"
//             />
//           </button>
//         </div>
//       )}
//     </form> */}
