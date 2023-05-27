import { SafeUser } from "@/types";
import React from "react";
import Heading from "../shared/Heading";
import HearthButton from "../shared/HeartButton";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import BluredImage from "../shared/BluredImage";

interface ListingHeadProps {
  title: string;
  imageSrc: {
    name: string;
  }[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ title, imageSrc, id }) => {
  return (
    <>
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Swiper
          spaceBetween={30}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {imageSrc.map((img) => {
            return (
              <SwiperSlide key={img.name}>
                <BluredImage
                  src={img.name}
                  alt={title}
                />
              </SwiperSlide>
            );
          })}
          <div className="swiper-button-prev hover:bg-white/75 absolute top-1/2 -translate-y-1/2 left-2 rounded-full  z-10 cursor-pointer">
            <BiChevronLeft size={20} />
          </div>
          <div className="swiper-button-next hover:bg-white/75 absolute top-1/2 right-2  -translate-y-1/2 rounded-full z-10 cursor-pointer">
            <BiChevronRight size={20} />
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default ListingHead;
