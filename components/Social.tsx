"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    }).then((data) => console.log(data));
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        onClick={() => {
          onClick("github");
        }}
        className="w-full"
        size="lg"
        variant="outline"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => {
          onClick("google");
        }}
        className="w-full"
        size="lg"
        variant="outline"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
