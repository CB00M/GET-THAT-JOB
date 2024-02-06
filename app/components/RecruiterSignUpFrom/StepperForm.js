"use client";
import { useState } from "react";
import Image from "next/image";
import LoginInfo from "./LoginInfo";
import CompanyInfo from "./CompanyInfo";
import signUp from "../../pages/recruiterSignUp/api/action";

export default function StepperForm() {
  const [page, setPage] = useState(1);

  const handleNext = () => {
    setPage((page) => page + 1);
  };

  const handleSkip = () => {
    setActiveStep(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Register sucessfully");
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 1:
        return <LoginInfo />;
      case 2:
        return <CompanyInfo />;
    }
  }
  return (
    <form action={signUp}>
      {/* Step 1 */}
      {page === 1 && (
        <>
          <div>{getStepContent(page)}</div>
          <button
            className="p-2 w-20 h-10 bg-[#F48FB1] text-white mt-4  rounded-2xl text-sm relative ml-[120px]"
            onClick={handleNext}
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
        </>
      )}

      {page === 2 && (
        <div>
          {/* Step 2 */}
          <div>{getStepContent(page)}</div>
          <button className="m-5 ml-[100px] p-2 w-[120px] h-10 border border-[#F48FB1] mt-4 rounded-2xl text-sm relative">
            SKIP THIS!
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
        </div>
      )}
    </form>
  );
}
