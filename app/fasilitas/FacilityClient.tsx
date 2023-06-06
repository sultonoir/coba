"use client";
import Container from "@/components/shared/Container";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import sky from "@/public/sky.jpg";
import gym from "@/public/gym.jpg";
import cafe from "@/public/cafe.jpg";
import { Clock } from "lucide-react";

const facility = [
  {
    name: "Sky Bar",
    image: sky,
    open: "4:30pm",
    close: "12am",
    desc: "We sell a wide range of alcoholic and non-alcoholic beverages for guest satisfaction. ",
  },
  {
    name: "Fitness Centre",
    image: gym,
    open: "09am",
    close: "10pm",
    desc: "Fitness Facility provides basic fitness equipment. We have a range of equipment to support your exercise and healthy lifestyle. Our fitness facility is located near the pool area to provide the best fitness access to our guests. Come and be healthy together",
  },
  {
    name: "Restaurant",
    image: cafe,
    open: "06am",
    close: "10pm",
    desc: "Promenade cafe is located in the lobby.The services served are buffet breakfast, buffet lunch and also serve a la carte. The food served is Indonesian, Chinese and European dishes.",
  },
];

const FacilityClient = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-8 gap-5  mt-6">
        {facility.map((fas) => (
          <Dialog key={fas.name}>
            <DialogTrigger
              className="sm:col-span-4 xl:col-span-2 group shadow-sm border rounded-xl overflow-hidden h-[300px]"
              key={fas.name}
            >
              <div className="relative h-full">
                <Image
                  src={fas.image}
                  alt={fas.name}
                  fill
                  style={{ objectFit: "cover" }}
                  quality={100}
                  priority
                  sizes="100%"
                  className="duration-700 ease-in-out group-hover:scale-110"
                />
                <p className="z-10 absolute w-full bottom-5 text-xl text-white text-center">
                  {fas.name}
                </p>
              </div>
            </DialogTrigger>
            <DialogContent className="w-[990px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">{fas.name}</DialogTitle>
                <div className="flex justify-center justify-items-center gap-5">
                  <Clock size={24} />
                  <DialogDescription>{fas.open}</DialogDescription>
                  <DialogDescription> - </DialogDescription>
                  <DialogDescription>{fas.close}</DialogDescription>
                </div>
                <DialogDescription>{fas.desc}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </Container>
  );
};

export default FacilityClient;
