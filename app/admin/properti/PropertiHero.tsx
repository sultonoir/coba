"use client";
import React from "react";
import useHeroModal from "@/hooks/useHeroModal";
import { Button } from "@/components/ui/button";
import { Hero } from "@prisma/client";
import Image from "next/image";
interface PropertiClientProps {
  promosi: Hero[];
}

const PropertiHero: React.FC<PropertiClientProps> = ({ promosi }) => {
  const hero = useHeroModal();
  return (
    <div className="flex flex-col gap-5 h-[500px] mt-10">
      <Button
        onClick={hero.onOpen}
        size="sm"
        className="bg-rose-500 active:scale-90 text-white w-20 hover:bg-rose-600"
      >
        Upload
      </Button>
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

export default PropertiHero;
