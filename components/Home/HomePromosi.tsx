"use client";
import { Hero } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { play } from "../listing/Listingcard";
interface HomePromosiProps {
  promosi: Hero[];
}

const HomePromosi: React.FC<HomePromosiProps> = ({ promosi }) => {
  return (
    <div className="h-[500px] mt-10">
      <h1
        className={`${play.className} text-5xl font-bold text-center capitalize`}
      >
        special offers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-8 gap-5 mt-6">
        {promosi.map((promo) => (
          <div
            className="sm:col-span-4 xl:col-span-2 group shadow-sm border rounded-xl overflow-hidden h-[300px]"
            key={promo.id}
          >
            <div className="relative h-full">
              <Image
                src={promo.img}
                alt={promo.name}
                fill
                style={{ objectFit: "cover" }}
                quality={100}
                sizes="100%"
                className="group-hover:scale-110 transition"
              />
              <p className="z-10 absolute w-full bottom-5 text-xl text-white text-center">
                {promo.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePromosi;
