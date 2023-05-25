"use client";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiModernCity,
  GiVillage,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdVilla } from "react-icons/md";
import Container from "../shared/Container";
import CategoryBox from "../shared/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { HiOutlineHomeModern } from "react-icons/hi2";

export const categories = [
  {
    label: "Tepi pantai",
    icon: TbBeach,
    description: "Properti ini berada di pusat dekat pantai",
  },
  {
    label: "Pusat kota",
    icon: GiModernCity,
    description: "Properti ini berada di pusat kota",
  },
  {
    label: "Pedesaan",
    icon: GiVillage,
    description: "Properti ini berada dipedesaan",
  },
  {
    label: "Rumah",
    icon: HiOutlineHomeModern,
    description: "Properti ini berada dipedesaan!",
  },
  {
    label: "Villa",
    icon: MdOutlineVilla,
    description: "Properti ini memiliki villa keren!",
  },
  {
    label: "Pegunungan",
    icon: TbMountain,
    description: "Properti ini memiliki pemandangan pegunungan",
  },
  {
    label: "Kolam renang",
    icon: TbPool,
    description: "Properti ini memiliki kolam yang indah!",
  },
  {
    label: "Pulau",
    icon: GiIsland,
    description: "Properti ini berada di sebuah pulau!",
  },
  {
    label: "Tepi danau",
    icon: GiBoatFishing,
    description: "Properti ini berada di dekat danau!",
  },
  {
    label: "Mansion",
    icon: MdVilla,
    description: "Properti ini mansion keren!",
  },
  {
    label: "Goa",
    icon: GiCaveEntrance,
    description: "Properti ini berada di goa",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "Properti ini menawarkan kegiatan berkemah!",
  },
  {
    label: "Lumbung",
    icon: GiBarn,
    description: "Properti ini ada di lumbung!",
  },
  {
    label: "luxury",
    icon: IoDiamond,
    description: "Properti ini baru dan mewah!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainpage = pathname === "/";

  if (!isMainpage) {
    return null;
  }
  return (
    <Container>
      <div className="flex flex-row justify-between items-center pt-4 overflow-x-auto gap-x-4">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            seleted={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
