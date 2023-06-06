import { IconType } from "react-icons";
import { IoBedOutline, IoStarSharp } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { play } from "./Listingcard";
import { BsCheck } from "react-icons/bs";

interface ListingInfoProps {
  title: string;
  description: string;
  guestCount: number;
  roomCount: number;
  fasilitas: {
    item: string;
  }[];
  id: string;
  bed: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  description,
  guestCount,
  roomCount,
  fasilitas,
  title,
  id,
  bed,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div
            className={`text-xl font-semibold capitalize flex flex-col lg:flex-row ${play.className}`}
          >
            <p>{title}.</p>
          </div>
          <div className="flex flex-row gap-5 items-center justify-evenly">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
              <BiUser
                size={20}
                className="text-rose-500"
              />
              <p className="text-neutral-500">{guestCount} Person</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
              <IoBedOutline
                size={20}
                className="text-rose-500"
              />
              <p className="text-neutral-500"> {bed} Bed</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-lg font-light text-neutral-500 text-justify indent-8">
        {description}
      </div>
      <hr />
      <p className={`${play.className} font-semibold text-xl`}>Fasilitas</p>
      <div className="grid grid-cols-2 gap-y-2 gap-x-5">
        {fasilitas.map((fas) => (
          <ul key={fas.item}>
            <li className="flex flex-row gap-x-2">
              <BsCheck />
              {fas.item}
            </li>
          </ul>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ListingInfo;
