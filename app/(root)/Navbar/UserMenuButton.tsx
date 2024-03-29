"use client";

import Image from "next/image";
import { Session } from "next-auth";
import profilePlaceholder from "@/app/assets/profile-pic-placeholder.png";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExitIcon, AvatarIcon } from "@radix-ui/react-icons";

interface UserMenuButtonProps {
  session: Session | null;
}

const UserMenuButton = ({ session }: UserMenuButtonProps) => {
  const user = session?.user;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {user ? (
          <Image
            src={user?.image || profilePlaceholder}
            alt="profile picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          {user ? (
            <>
              <p className="text-lg text-primary font-semibold">{user?.name}</p>
              <Button
                className="btn-outline m-4"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
                <ExitIcon />
              </Button>
            </>
          ) : (
            <Link href={"/auth/login"}>
              <AvatarIcon className="h-5 w-5" />
              Sign In
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserMenuButton;
