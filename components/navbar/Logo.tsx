"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="w-[40px] h-[40px] block">
        <Image
          src={`/logo.svg`}
          height={40}
          priority
          width={40}
          className="block cursor-pointer rounded-full"
          alt="logo"
        />
      </div>
    </Link>
  );
};

export default Logo;
