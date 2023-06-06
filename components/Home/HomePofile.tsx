"use client";
import React from "react";
import { play } from "../listing/Listingcard";
import Image from "next/image";
import { Rating } from "@prisma/client";
import Container from "../shared/Container";
import { IoIosStar } from "react-icons/io";

interface HomeProfileProps {
  ratings: Rating[];
}
const HomeProfile: React.FC<HomeProfileProps> = ({ ratings }) => {
  function hitungRataRataRating(ratings: any) {
    let totalRating = 0;
    let jumlahData = 0;

    for (let i = 0; i < ratings.length; i++) {
      totalRating += ratings[i].value;
      jumlahData++;
    }

    const rataRata = totalRating / jumlahData;
    return isNaN(rataRata) ? 0 : rataRata.toFixed(1);
  }

  const rataRataRating = hitungRataRataRating(ratings);
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
            KyOuka Hotel
          </p>
          <p className="text-xl text-justify indent-8">
            Let's find an unforgettable stay at Kyouka Hotel! Enjoy unparalleled
            luxury and comfort in an elegant setting and high-quality service.
            With a strategic location in the city center, Kyouka Hotel is the
            ideal choice for your business and leisure trips. With modern
            facilities, mouth-watering restaurants and scenic views, we
            guarantee a satisfying stay. Immediately book your room at Kyouka
            Hotel and feel our warm hospitality and attention to every detail to
            fulfill your needs. Welcome to the world of unrivaled luxury at
            Kyouka Hotel!
          </p>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row items-center gap-2">
              <IoIosStar
                size={30}
                className="text-rose-500"
              />
              <p className={`text-3xl`}>{rataRataRating}</p>
            </div>
            <p className="text-xl capitalize">user ratings</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeProfile;
