"use client";
import useSearchModal from "@/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { getRegencyByName } from "territory-indonesia";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  if (!params) {
    return null;
  }
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const [coordinate, setCoordinate] = useState<any>("Anywhere");
  const locationValue = params?.get("locationValue");

  useEffect(() => {
    const fetch = async () => {
      if (typeof locationValue === "string") {
        const cities = await getRegencyByName(locationValue);
        setCoordinate(cities.name);
      }
    };
    fetch();
  }, [locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let dif = differenceInDays(end, start);

      if (dif === 0) {
        dif = 1;
      }
      return `${dif} hari`;
    }
    return "Minggu manapun";
  }, [startDate, endDate]);

  const gusetLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} tamu`;
    }
    return "Tambahkan tamu";
  }, [guestCount]);

  return (
    <>
      <div
        onClick={searchModal.onOpen}
        className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer hidden md:block"
      >
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm font-semibold pl-5 md:px-6">
            {coordinate || "Ke mana ?"}
          </div>
          <div className="hidden lg:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
            {durationLabel}
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden lg:block">{gusetLabel}</div>
            <div className="p-2 bg-rose-500 rounded-full text-white">
              <BiSearch size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="border border-neutral-200 hover:shadow-md transition cursor-pointer rounded-full md:hidden p-3">
        <BiSearch size={18} />
      </div>
    </>
  );
};

export default Search;
