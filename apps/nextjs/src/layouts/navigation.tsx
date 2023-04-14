"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import Link from "next/link";
import Image from "next/image";

import { IconButterfly } from "@tabler/icons-react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "../hooks";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/router";

const useOutside = (
  callback: CallableFunction,
  profileRef: RefObject<HTMLDivElement>,
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback, profileRef]);

  return ref;
};

export const NavigationLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const router = useRouter();
  const ref = useOutside(closeMenu, profileRef);
  const user = useUser();

  if (!user)
    return (
      <nav className="relative flex w-full flex-row items-center gap-2 bg-purple p-4 shadow-md shadow-dark-gray">
        <div>
          <Link href="/">
            <IconButterfly className="h-12 w-12 text-light-gray duration-300 hover:text-white" />
          </Link>
        </div>
        <div className="absolute right-4 flex ">
          <button
            onClick={() => router.push("sign-up")}
            className="px-2 py-1 tracking-widest text-white"
          >
            Sign Up
          </button>
          <button
            onClick={() => router.push("sign-in")}
            className="rounded bg-indigo-600/80 px-2.5 py-1 text-lg font-medium tracking-wider text-white"
          >
            Sign In
          </button>
        </div>
      </nav>
    );

  return (
    <>
      <nav className="relative flex w-full flex-row items-center gap-4 bg-purple p-4 shadow-md shadow-dark-gray">
        <div>
          <Link href="/">
            <IconButterfly className="h-12 w-12 text-light-gray duration-300 hover:text-white" />
          </Link>
        </div>
        <ul className="flex flex-row space-x-4 text-lg tracking-widest">
          <li className="font-semibold text-light-gray/70 duration-300 hover:text-white">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="font-semibold text-light-gray/70 duration-300 hover:text-white">
            <Link href="/posts">My Post</Link>
          </li>
        </ul>
        <div
          ref={profileRef}
          onClick={toggleMenu}
          className="absolute right-4 cursor-pointer rounded-full"
        >
          {user?.profileImageUrl && (
            <Image
              width={48}
              height={48}
              src={user?.profileImageUrl}
              alt=""
              priority={true}
            />
          )}
          {!user?.profileImageUrl && <UserCircleIcon className="h-12 w-12" />}
        </div>
      </nav>
      <ProfileOptions menuRef={ref} toggle={isOpen} />
    </>
  );
};

type ProfileOptionsProps = {
  menuRef: RefObject<HTMLDivElement>;
  toggle: boolean;
};

const ProfileOptions = ({ menuRef, toggle }: ProfileOptionsProps) => {
  return (
    <div
      ref={menuRef}
      className={`absolute right-2 top-[90px] w-36 rounded-md bg-purple px-2 text-white shadow-md ${
        toggle
          ? `translate-x-0 shadow-dark-gray duration-700`
          : `translate-x-44 shadow-white duration-1000`
      }`}
    >
      <div
        ref={menuRef}
        className="cursor-pointer border-b border-light-gray/60 py-1.5"
      >
        <Link className="w-full cursor-pointer" href="/profile">
          Preferences
        </Link>
      </div>
      <div className="w-full cursor-pointer py-1.5 last:border-none">
        <SignOutButton />
      </div>
    </div>
  );
};
