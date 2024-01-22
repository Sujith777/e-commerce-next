"use client";

import React, { useTransition } from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  className?: string;
}

const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
  className,
}: LoginButtonProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <button type="submit" disabled={isPending} className={className}>
      {children}
    </button>
  );
};

export default LoginButton;
