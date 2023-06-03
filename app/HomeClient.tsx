"use client";
import HomeHero from "@/components/Home/HomeHero";
import HomeNavigations from "@/components/Home/HomeNavigations";
import HomeProfile from "@/components/Home/HomePofile";
import HomePromosi from "@/components/Home/HomePromosi";
import EmptyState from "@/components/shared/EmptyState";
import { SafeListing } from "@/types";
import { Hero, Rating } from "@prisma/client";
import React from "react";

interface HomeClientProps {
  listings: SafeListing[];
  ratings: Rating[];
  promosi: Hero[];
}

const HomeClient: React.FC<HomeClientProps> = ({
  listings,
  ratings,
  promosi,
}) => {
  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <>
      <HomeHero listings={listings} />
      <HomeProfile ratings={ratings} />
      <HomeNavigations />
      <HomePromosi promosi={promosi} />
    </>
  );
};

export default HomeClient;
