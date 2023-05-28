"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import useLoginModal from "@/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import Container from "@/components/shared/Container";
import ListingHead from "@/components/listing/ListingHead";
import ListingInfo from "@/components/listing/ListingInfo";
import ListingReservation from "@/components/listing/ListingReservation";
import { Additional } from "@prisma/client";
import Counter from "@/components/inputs/Counter";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    additional: Additional[];
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();

  const router = useRouter();

  const newData = {
    ...listing,
    imageSrc: listing.imageSrc.map((src) => ({ name: src })),
    fasilitas: listing.fasilitas.map((src) => ({ item: src })),
    additional: listing.additional.map((src) => ({
      name: src.name,
      cost: parseInt(src.cost, 10),
    })),
  };

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [total, setTotal] = useState(totalPrice);
  const [rooms, setRooms] = useState(1);
  const additional = newData.additional;
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(additional.length).fill(false)
  );

  useEffect(() => {
    let newTotalPrice = totalPrice;

    for (let i = 0; i < checkedItems.length; i++) {
      if (checkedItems[i]) {
        newTotalPrice += additional[i].cost;
      }
    }

    setTotal(newTotalPrice);
  }, [checkedItems, additional, totalPrice]);

  const formatter = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  });

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        userId: currentUser.id,
        totalPrice: total,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
        guestName: currentUser.name,
        guestImage: currentUser.image,
        adminId: currentUser.id,
        status: "pending",
      })
      .then(() => {
        toast.success("Berhasil mereservasi");
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
    total,
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
      if (dayCount && listing.price && rooms) {
        let calculatedPrice = dayCount * listing.price * rooms;

        if (listing.discount && listing.discount > 0) {
          const discountAmount =
            (listing.discount / 100) * calculatedPrice * rooms;
          calculatedPrice -= discountAmount;
        }

        setTotalPrice(calculatedPrice);
      } else {
        setTotalPrice(listing.price * rooms);
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
      {additional.map((item, index) => (
        <div
          key={item.name}
          className="flex flex-col gap-2 py-2"
        >
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              title="additional"
              onChange={() => {
                const updatedCheckedItems = [...checkedItems];
                updatedCheckedItems[index] = !updatedCheckedItems[index];
                setCheckedItems(updatedCheckedItems);
              }}
            />
            <div className="flex justify-between w-full">
              <p>{item.name}</p>
              <p>{formatter.format(item.cost)}</p>
            </div>
          </div>
        </div>
      ))}
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
                totalPrice={total}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDate={disabledDates}
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
