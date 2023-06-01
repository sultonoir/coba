// File: CategoryInput.tsx
import { SafeListing } from "@/types";
import React from "react";
import { IconType } from "react-icons";

type Listing = {
  id: string;
  price: number;
};

type Props = {
  label: string;
  selected?: boolean;
  onClick: (value: Listing) => void;
  item: SafeListing;
};

const CategoryInput = ({ label, selected, onClick, item }: Props) => {
  return (
    <div
      onClick={() => onClick({ id: item.id, price: item.price })}
      className={`
        rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
