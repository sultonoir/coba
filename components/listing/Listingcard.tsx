"use client";

import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
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
import Image from "next/image";
import useRatingsModal from "@/hooks/useRatings";
import RatingsModal from "../modal/RatingsModal";
import ButtonConfirm from "../shared/ButtonConfrim";
import { Playfair_Display } from "next/font/google";
import { IoBedOutline } from "react-icons/io5";
import EditListingModal from "../modal/EditListingModal";
import useEditnModal from "@/hooks/useEditModal";
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
  guest?: boolean;
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
  guest,
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
    const formatter = new Intl.NumberFormat("us-US", {
      style: "currency",
      currency: "USD",
    });

    if (reservation) {
      const formattedPrice = formatter.format(reservation.totalPrice);
      return formattedPrice;
    }

    const formattedPrice = formatter.format(data.price);
    return formattedPrice;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

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

  const ratingModal = useRatingsModal();
  const onCompByHost = useCallback(() => {
    setIsLoading(true);
    axios
      .put("api/reservations", {
        status: "completedByhost",
        reservationId: reservation?.id,
      })
      .then((e) => {
        toast.success("reservations selesai");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reservation?.status]);

  const onCompleted = useCallback(() => {
    if (reservation?.status === "success") {
      setIsLoading(true);
      axios
        .put("api/reservations", {
          status: "completed",
          reservationId: reservation?.id,
        })
        .then(() => {
          toast.success("Menyelesaikan reservasi");
          ratingModal.onOpen();
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (reservation?.status === "completedByhost") {
      setIsLoading(true);
      axios
        .put("api/reservations", {
          status: "completed",
          reservationId: reservation?.id,
        })
        .then((e) => {
          ratingModal.onOpen();
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [reservation?.status]);

  const labelCompletd = useMemo(() => {
    if (reservation?.status === "success") {
      return "Konfirmasi Selesai";
    }
    if (reservation?.status === "completedByhost") {
      return "Berikan penilaian";
    }
  }, [reservation?.status]);
  const editModal = useEditnModal();
  return (
    <div className="sm:col-span-4 xl:col-span-2 group relative shadow-sm border rounded-xl">
      <RatingsModal listingId={data.id} />
      <EditListingModal
        data={data}
        Addtional={data.additional}
      />
      <div className="flex flex-col gap-3 w-full">
        <div
          className="
            aspect-video
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
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
        <div className="flex flex-row gap-5 items-center justify-evenly">
          <div className="flex flex-col items-center justify-center">
            <BiUser
              size={20}
              className="text-rose-500"
            />
            <p>Capacity</p>
            <p className="text-neutral-500">{data.guestCount} Person</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <IoBedOutline
              size={20}
              className="text-rose-500"
            />
            <p>Bed</p>
            <p className="text-neutral-500">{data.bed} Bed</p>
          </div>
        </div>
        {guest && (
          <div className="flex flex-row gap-2">
            <span className="w-10 h-10">
              <Image
                alt="Avatar"
                width={40}
                height={40}
                src={reservation?.guestImage || `/placeholder.jpg`}
                className="rounded-full aspect-square"
              />
            </span>
            <p className="font-light text-neutral-500">
              {reservation?.guestName}
            </p>
          </div>
        )}
        <div className="font-light text-neutral-500">{reservationDate}</div>
        <div className="flex flex-row justify-between px-2">
          <div className="flex flex-col">
            <p
              className={`${play.className} text-xl font-semibold text-foreground uppercase`}
            >
              {data.title}
            </p>
            <div className="flex flex-row items-center gap-1">
              <p className="font-semibold">{price}</p>
              {!reservation && <p className="font-light">/ Night</p>}
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href={`listings/${data.id}`}
              className="border-rose-500 border px-2 py-1 rounded-lg hover:bg-rose-500 hover:text-white hover:underline"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 px-2 py-1">
        <div className="flex gap-2">
          {edit && (
            <Button
              onClick={editModal.onOpen}
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
        </div>
        {payment && (
          <div className="mt-2">
            <ButtonConfirm
              onClick={onCreateReservation}
              small
              label="bayar"
              disabled={isLoading}
            />
          </div>
        )}
        {completed && (
          <div className="mt-2">
            <ButtonConfirm
              confirm
              onClick={onCompleted}
              small
              label={labelCompletd}
              disabled={isLoading}
            />
          </div>
        )}
        {host && (
          <div className="mt-2">
            <ButtonConfirm
              confirm
              onClick={onCompByHost}
              small
              label="Selesaika reservasi"
              disabled={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
