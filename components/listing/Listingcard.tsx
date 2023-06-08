"use client";

import { useCallback, useMemo, useState } from "react";
import Button from "../shared/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { Autoplay, Pagination, Navigation } from "swiper";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import Link from "next/link";
import BluredImage from "../shared/BluredImage";
import { BiChevronLeft, BiChevronRight, BiUser } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-hot-toast";
import useRatingsModal from "@/hooks/useRatings";
import ButtonConfirm from "../shared/ButtonConfrim";
import { Playfair_Display } from "next/font/google";
import { IoBedOutline } from "react-icons/io5";
import EditListingModal from "../modal/EditListingModal";
import RatingsModal from "../modal/RatingsModal";
export const play = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-play",
  display: "swap",
});

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  edit?: boolean;
  payment?: boolean;
  completed?: boolean;
  host?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
  payment,
  completed,
  host,
  edit,
}) => {
  const newData = {
    ...data,
    imageSrc: data.imageSrc.map((src) => ({ name: src })),
  };

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    if (reservation) {
      const formattedPrice = formatter.format(reservation.totalPrice);
      return formattedPrice;
    }

    const formattedPrice = formatter.format(data.price);
    return formattedPrice;
  }, [reservation, data.price]);

  const priceDiscount = useMemo(() => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    if (data.discount) {
      const discount = data.price * (data.discount / 100); //
      const price = data.price - discount;
      const formattedPrice = formatter.format(price);
      return formattedPrice;
    }

    return formatter.format(data.price); // Mengembalikan harga tanpa diskon jika tidak ada diskon
  }, [data.discount, data.price]);

  const [isLoading, setIsLoading] = useState(false);

  const onCreateReservation = useCallback(() => {
    setIsLoading(true);
    axios
      .post("api/payment", {
        totalPrice: reservation?.totalPrice,
        title: reservation?.listing.title,
        image: [
          reservation?.listing.imageSrc[0],
          reservation?.listing.imageSrc[1],
        ],
        reservationId: reservation?.id,
        userId: currentUser?.id,
      })
      .then((response) => {
        const data = response.data.url;
        window.location.href = data;
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reservation?.totalPrice, reservation?.listing.title]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editListingId, setEditListingId] = useState("");
  const [ratingModalid, setRatingModalid] = useState<any>();
  const [ratingModal, setratingModal] = useState(false);

  const openEditModal = (listingId: string) => {
    setEditListingId(listingId);
    setEditModalVisible(true);
  };

  const handleEditClick = () => {
    openEditModal(data.id);
  };

  // ratingsmodal
  const openRatingModal = (id: string | undefined) => {
    setRatingModalid(id);
    setratingModal(true);
  };

  const handleRatingModals = () => {
    openRatingModal(reservation?.id);
  };

  const onCompleted = useCallback(() => {
    if (reservation?.status === "Complete") {
      handleRatingModals();
    }
  }, [reservation?.status]);

  const labelCompletd = useMemo(() => {
    if (reservation?.status === "Complete") {
      return "Give ratings";
    }
  }, [reservation?.status]);

  return (
    <div className="sm:col-span-4 xl:col-span-2 group relative shadow-sm border rounded-xl overflow-hidden">
      <EditListingModal
        listings={data}
        editModalVisible={editModalVisible}
        editListingId={editListingId}
        onClose={() => setEditModalVisible(false)}
      />
      <RatingsModal
        ratingModalid={ratingModalid}
        ratingModal={ratingModal}
        onClose={() => setratingModal(false)}
      />
      <div className="flex flex-col gap-3 w-full">
        <div
          className="
            aspect-video
            w-full 
            relative 
            overflow-hidden
            p-2
          "
        >
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
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {newData.imageSrc.map((img) => {
              return (
                <SwiperSlide key={img.name}>
                  <BluredImage
                    src={img.name}
                    alt={data.title}
                    border
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
        <div className="flex flex-row justify-between px-2">
          <div className="flex flex-col gap-3">
            <p
              className={`${play.className} text-xl font-semibold text-foreground uppercase`}
            >
              {data.title}
            </p>
            <div className="flex flex-row gap-5 items-center">
              <div className="flex flex-row items-center">
                <BiUser
                  size={20}
                  className="text-rose-500"
                />
                <p className="text-neutral-500">{data.guestCount} Person</p>
              </div>
              <div className="flex flex-row items-center">
                <IoBedOutline
                  size={20}
                  className="text-rose-500"
                />
                <p className="text-neutral-500">{data.bed} Bed</p>
              </div>
            </div>
            {data.discount ? (
              <div className="flex flex-row items-center gap-1">
                <div className="flex flex-row items-center gap-1 line-through text-neutral-500">
                  <p className="font-semibold">{price}</p>
                </div>
                <p className="font-semibold">{priceDiscount}</p>
                <p className="font-light">/ Night</p>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-1">
                <p className="font-semibold">{price}</p>
                <p className="font-light">/ Night</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 px-2 py-1">
        <Link
          href={`listings/${data.id}`}
          className="border-rose-500 border px-2 py-1 rounded-lg hover:bg-rose-500 hover:text-white hover:underline w-full text-center"
        >
          Details
        </Link>
        <div className="flex gap-2">
          {edit && (
            <Button
              onClick={handleEditClick}
              label="Edit"
              small
              outline
            />
          )}
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
          {payment && (
            <ButtonConfirm
              onClick={onCreateReservation}
              small
              label="Pay"
              disabled={isLoading}
              confirm
            />
          )}
        </div>
        {completed && (
          <div className="mt-2">
            <ButtonConfirm
              confirm
              onClick={onCompleted}
              small
              label={labelCompletd}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
