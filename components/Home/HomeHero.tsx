"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { SafeListing } from "@/types";
import BluredImage from "../shared/BluredImage";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { play } from "../listing/Listingcard";
import Link from "next/link";
import Search from "../navbar/Search";
import Container from "../shared/Container";
interface HomeHeroProps {
  listings: SafeListing[];
}

const HomeHero: React.FC<HomeHeroProps> = ({ listings }) => {
  return (
    <Container>
      <div className="sm:aspect-video relative">
        <Swiper
          spaceBetween={30}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {listings.map((listing) => (
            <SwiperSlide key={listing.id}>
              <div className="aspect-square sm:flex sm:flex-row sm:gap-2  overflow-hidden relative">
                <div className="sm:w-1/2 h-full sm:h-1/2 rounded-lg">
                  <BluredImage
                    src={listing.imageSrc[0]}
                    alt={listing.title}
                    border
                  />
                </div>
                <div className="absolute bottom-2 left-1 sm:relative sm:order-first flex flex-col gap-4 bg-neutral-500/20 rounded-lg p-2 backdrop-blur-sm sm:bg-transparent sm:w-1/2 justify-center items-center sm:h-1/2">
                  <h1 className={`${play.className} text-2xl font-bold`}>
                    <div className="hidden sm:flex flex-col gap-2 capitalize">
                      <p>Amazing suite</p>
                      <p>with offshore view</p>
                      <p>& lot of service</p>
                    </div>
                    {listing.title}
                  </h1>
                  <Link
                    href={`/listings/${listing.id}`}
                    className="rounded-lg px-2 py-1 bg-rose-500 w-[110px] text-white"
                  >
                    View Rooms
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev hover:bg-white/75 absolute top-1/2 -translate-y-1/2 left-2 rounded-full  z-10 cursor-pointer">
            <BiChevronLeft size={20} />
          </div>
          <div className="swiper-button-next hover:bg-white/75 absolute top-1/2 right-2  -translate-y-1/2 rounded-full z-10 cursor-pointer">
            <BiChevronRight size={20} />
          </div>
        </Swiper>
        <Search />
      </div>
    </Container>
  );
};

export default HomeHero;
