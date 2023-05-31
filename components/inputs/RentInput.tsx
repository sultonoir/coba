"use client";

import useRentModal from "@/hooks/useRentModal";
import Heading from "../shared/Heading";
import { AiOutlinePlusCircle } from "react-icons/ai";

const RentInput = () => {
  const rentmodal = useRentModal();
  return (
    <div className="flex flex-col gap-y-3 max-w-xs">
      <Heading
        title="Properties"
        subtitle="Buat properi mu"
      />
      <button
        onClick={rentmodal.onOpen}
        className="bg-rose-500 p-2 rounded-full flex flex-row gap-1 items-center justify-center text-foreground active:scale-90 transition hover:text-white"
      >
        <AiOutlinePlusCircle size={24} />
        property
      </button>
    </div>
  );
};

export default RentInput;
