"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <span className="w-[40px] h-[40px] block">
        <Image
          src={`/logo.svg`}
          height={40}
          priority
          width={40}
          className="block cursor-pointer rounded-full"
          alt="logo"
        />
      </span>
    </Link>
  );
};

export default Logo;
