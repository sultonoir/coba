"use client";
import React from "react";
import { play } from "../listing/Listingcard";
import Image from "next/image";
import { Rating } from "@prisma/client";
import Container from "../shared/Container";

interface HomeProfileProps {
  ratings: Rating[];
}
const HomeProfile: React.FC<HomeProfileProps> = ({ ratings }) => {
  return (
    <Container>
      <div className="flex flex-row gap-3 relative h-[800px]">
        <div className="hidden sm:flex flex-row gap-2 w-1/2 items-center justify-center">
          <div className="w-[200px] h-[300px] relative rounded-md">
            <Image
              src={`/lobi.jpg`}
              alt="logo"
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              quality={100}
            />
          </div>
          <div className="w-[200px] h-[500px] relative rounded-md">
            <Image
              src={`/sky.jpg`}
              alt="logo"
              fill
              sizes="100%"
              style={{ objectFit: "cover" }}
              quality={100}
            />
          </div>
        </div>
        <div className="flex flex-col text-center w-full sm:w-1/2 items-center justify-center gap-3">
          <h1 className={`${play.className} text-7xl capitalize font-bold`}>
            Welcome to our
          </h1>
          <p className={`${play.className} text-5xl text-rose-500`}>
            KyOuka Hotels
          </p>
          <p className="text-xl text-justify">
            We Have Over 40 Payment Ways for Locking the Lowest Room Rates. No
            Credit Card Needed! Read Reviews from Verified Guests.
          </p>
          <div className="flex flex-row gap-2 items-center">
            <p className={`text-3xl`}>4.5</p>
            <p className="text-xl capitalize">user ratings</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeProfile;
