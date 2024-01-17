"use client";

import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const SubmitButton = ({ children, className, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button {...props} type="submit" disabled={pending} className={className}>
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default SubmitButton;
