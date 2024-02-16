"use client";

import { useRouter } from "next/navigation";

export default function RecruiterButton({ id }) {
  const router = useRouter();

  function handleClick() {
    router.push(`/pages/jobPosting/${id}`);
  }
  return (
    <button className="m-2 bg-slate-400" onClick={handleClick}>
      show recruiter
    </button>
  );
}
