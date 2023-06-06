"use client";
import { Hero } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { play } from "../listing/Listingcard";
import Container from "../shared/Container";
import { motion } from "framer-motion";
interface HomePromosiProps {
  promosi: Hero[];
}

const HomePromosi: React.FC<HomePromosiProps> = ({ promosi }) => {
  return (
    <Container>
      <motion.div
        className="mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
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
                  className="duration-700 ease-in-out group-hover:scale-110"
                />
                <p className="z-10 absolute w-full bottom-5 text-xl text-white text-center">
                  {promo.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
};

export default HomePromosi;
