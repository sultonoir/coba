"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../../types";
import useFavorite from "../../hooks/useFavorite";

type Props = {
  listingId: string;
  currentUser: SafeUser | null | undefined;
};

const HearthButton = ({ listingId, currentUser }: Props) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <div className="absolute right-3 top-3">
        <AiOutlineHeart
          size={28}
          className="
        fill-white
        absolute
          -top-[2px]
          -right-[2px]
        "
        />
        <AiFillHeart
          size={24}
          className={`
        
        ${hasFavorited ? "fill-rose-500" : "fill-neutral-500 stroke-white"}`}
        />
      </div>
    </div>
  );
};

export default HearthButton;
