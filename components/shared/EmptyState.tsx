"use client";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
import useRentModal from "@/hooks/useRentModal";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  rentmodal?: boolean;
};

const EmptyState = ({
  title = "Tidak ada kecocokan yang tepat",
  subtitle = "Coba ubah atau hapus beberapa filter Anda",
  showReset,
  rentmodal,
}: Props) => {
  const router = useRouter();
  const rentModal = useRentModal();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="back to main page"
            onClick={() => router.push("/")}
          />
        )}
        {rentmodal && (
          <Button
            outline
            label="Buat properti"
            onClick={rentModal.onOpen}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
