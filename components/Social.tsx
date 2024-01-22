"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";

const Social = () => {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button onClick={() => {}} className="w-full" size="lg">
        <FaGithub className="h-5 w-5" />
      </Button>
      <Button onClick={() => {}} className="w-full" size="lg">
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
