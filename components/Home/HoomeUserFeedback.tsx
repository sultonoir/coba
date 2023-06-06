import React from "react";
import Container from "../shared/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Rating, User } from "@prisma/client";
import { play } from "../listing/Listingcard";
import Avatar from "../shared/Avatar";
import { motion } from "framer-motion";

interface HoomeUserFeedbackProps {
  ratings: (Rating & { user: User | null })[];
}

const HoomeUserFeedback: React.FC<HoomeUserFeedbackProps> = ({ ratings }) => {
  console.log();
  return (
    <div className="mt-10 bg-[#F5F5F5]">
      <motion.div
        className="flex flex-col gap-5 pt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <h1
          className={`${play.className} text-5xl font-bold text-center capitalize`}
        >
          User Feedback
        </h1>
        <Container>
          <Swiper
            slidesPerView={3}
            loop
            spaceBetween={30}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              400: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {ratings.map((rating) => (
              <SwiperSlide
                key={rating.id}
                className="flex flex-col gap-5 p-2 justify-center items-center"
              >
                <div className="w-10 h-10 relative mx-auto">
                  <Avatar src={rating.user?.image} />
                </div>
                <h1
                  className={`${play.className} text-3xl font-bold text-center`}
                >
                  {rating.type}
                </h1>
                <blockquote className=" border-l-2 pl-6 italic">
                  "{rating.message}"
                </blockquote>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </motion.div>
    </div>
  );
};

export default HoomeUserFeedback;
