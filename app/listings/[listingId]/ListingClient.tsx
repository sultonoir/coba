"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import useLoginModal from "@/hooks/useLoginModal";
import { SafeAdmin, SafeListing, SafeReservation, SafeUser } from "@/types";
import Container from "@/components/shared/Container";
import ListingHead from "@/components/listing/ListingHead";
import ListingInfo from "@/components/listing/ListingInfo";
import ListingReservation from "@/components/listing/ListingReservation";
import Counter from "@/components/inputs/Counter";
import AdminReservation from "@/components/listing/AdminReservations";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing;
  currentUser?: SafeUser | null;
  admin?: SafeAdmin | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
  admin,
}) => {
  const loginModal = useLoginModal();

  const router = useRouter();

  const newData = {
    ...listing,
    imageSrc: listing.imageSrc.map((src) => ({ name: src })),
    fasilitas: listing.fasilitas.map((src) => ({ item: src })),
  };

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [rooms, setRooms] = useState(1);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        userId: currentUser.id,
        totalPrice: totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
        guestName: currentUser.name,
        guestImage: currentUser.image,
        adminId: currentUser.adminId,
        status: "pending",
        rooms,
      })
      .then(() => {
        toast.success("Successful reservation");
        setDateRange(initialDateRange);
        router.push("/payment");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    totalPrice,
    dateRange,
    listing?.id,
    router,
    currentUser,
    loginModal,
    initialDateRange,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && listing.price && rooms && rooms >= 0) {
        let calculatedPrice = dayCount * listing.price * rooms;

        setTotalPrice(calculatedPrice);
      }
      if (
        listing.price &&
        rooms &&
        rooms >= 0 &&
        listing.discount &&
        listing.discount > 0
      ) {
        const price = listing.price * (listing.discount / 100);
        const discount = listing.price - price;
        const discountAmount = discount * rooms;
        setTotalPrice(discountAmount);
      }
      if (
        dayCount &&
        listing.price &&
        rooms &&
        rooms >= 0 &&
        listing.discount &&
        listing.discount > 0
      ) {
        const price = listing.price * (listing.discount / 100);
        const discount = listing.price - price;
        const discountAmount = dayCount * discount * rooms;
        setTotalPrice(discountAmount);
      }
    }
  }, [dateRange, listing.price, listing.discount, rooms]);

  const body = (
    <div className="p-4">
      <Counter
        title="Rooms"
        subtitle="How many rooms reservation "
        value={rooms}
        onChange={(value) => setRooms(value)}
        max={listing.roomCount}
      />
    </div>
  );

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={newData.imageSrc}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              fasilitas={newData.fasilitas}
              title={listing.title}
              id={listing.id}
              bed={listing.bed}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                discount={listing.discount}
                body={body}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
