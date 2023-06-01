"use client";
import React from "react";
import { play } from "../listing/Listingcard";
import Image from "next/image";
import Link from "next/link";

const HomeNavigations = () => {
  return (
    <div className="h-[500px] p-5 overflow-hidden">
      <h1
        className={`${play.className} text-center text-5xl font-bold capitalize mb-5`}
      >
        explore our hotel
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 h-full">
        <Link href={`/rooms`}>
          <div className="relative h-full col-span-1 group overflow-hidden">
            <Image
              src={`/rooms.jpg`}
              alt={`rooms`}
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              quality={100}
              className="group-hover:scale-110 transition"
            />
            <div className="absolute bg-gradient-to-t from-black inset-0"></div>
            <p className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center text-white text-center capitalize group-hover:underline text-2xl">
              rooms
            </p>
          </div>
        </Link>
        <Link href={`/fasilitas`}>
          <div className="relative h-full col-span-1 group overflow-hidden">
            <Image
              src={`/sky.jpg`}
              alt={`rooms`}
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              quality={100}
              className="group-hover:scale-110 transition"
            />
            <div className="absolute bg-gradient-to-t from-black inset-0"></div>
            <p className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center text-white text-center capitalize group-hover:underline text-2xl">
              Facilities
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeNavigations;
