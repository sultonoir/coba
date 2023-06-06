"use client";
import HomeHero from "@/components/Home/HomeHero";
import HomeNavigations from "@/components/Home/HomeNavigations";
import HomeProfile from "@/components/Home/HomePofile";
import HomePromosi from "@/components/Home/HomePromosi";
import HoomeUserFeedback from "@/components/Home/HoomeUserFeedback";
import EmptyState from "@/components/shared/EmptyState";
import { SafeListing } from "@/types";
import { Hero, Rating, User } from "@prisma/client";
import React from "react";

interface HomeClientProps {
  listings: SafeListing[];
  ratings: (Rating & { user: User | null })[];
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
      <HoomeUserFeedback ratings={ratings} />
    </>
  );
};

export default HomeClient;
