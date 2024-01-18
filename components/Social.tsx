"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Social = () => {
  return (
    <div className="flex py-4 items-center gap-4 flex-col justify-center">
      <button onClick={() => {}} className="btn w-full">
        <FaGithub className="h-8 w-8" />
      </button>
      <button onClick={() => {}} className="btn w-full">
        <FcGoogle className="h-8 w-8" />
      </button>
    </div>
  );
};

export default Social;
