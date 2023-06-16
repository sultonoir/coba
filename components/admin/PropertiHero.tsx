"use client";

import useHeroModal from "@/hooks/useHeroModal";
import { Button } from "@/components/ui/button";
import { Hero } from "@prisma/client";
import Image from "next/image";
import Heading from "@/components/shared/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
interface PropertiClientProps {
  promosi: Hero[];
}

const PropertiHero: React.FC<PropertiClientProps> = ({ promosi }) => {
  const hero = useHeroModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="mt-10">
      <Heading
        title="Upload"
        subtitle="upload poster promosi"
      />
      <Button
        onClick={hero.onOpen}
        size="sm"
        className="bg-rose-500 active:scale-90 text-white w-20 hover:bg-rose-600 mt-2"
      >
        Upload
      </Button>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-8 gap-5 mt-6">
          {promosi.map((promo) => (
            <div
              className="sm:col-span-4 xl:col-span-2 group"
              key={promo.id}
            >
              <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <Image
                  src={promo.img}
                  alt={promo.name}
                  fill
                  style={{ objectFit: "cover" }}
                  quality={100}
                  className="duration-700 ease-in-out group-hover:scale-110 rounded-lg"
                />
                <div className="absolute bg-gradient-to-t from-black inset-0"></div>
                <p className="z-10 absolute w-full bottom-5 text-xl text-white text-center">
                  {promo.name}
                </p>
              </div>
              {isLoading ? (
                <Button
                  disabled
                  className="mt-2"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsLoading(true);
                    axios
                      .put("/api/promosi", {
                        id: promo.id,
                      })
                      .then(() => {
                        toast.success("berhasil dihapus");
                        router.refresh();
                      })
                      .catch((error) => {
                        toast.error(error.message);
                      });
                  }}
                  className="text-secondary bg-rose-500 hover:bg-rose-600 active:scale-90 transition mt-2"
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiHero;
