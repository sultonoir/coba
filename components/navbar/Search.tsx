"use client";
import useSearchModal from "@/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const roomCount = params?.get("roomCount");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let dif = differenceInDays(end, start);

      if (dif === 0) {
        dif = 1;
      }
      return `${dif} days`;
    }
    return "Booking Date";
  }, [startDate, endDate]);

  const gusetLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guest`;
    }
    return "Add Guest";
  }, [guestCount]);

  const roomLabel = useMemo(() => {
    if (roomCount) {
      return `${roomCount} Rooms`;
    }
    return "Add Rooms";
  }, [roomCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="hidden sm:block border-[1px] max-w-md mx-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{durationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {roomLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{gusetLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
