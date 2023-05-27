"use client";
import ListingCard from "@/components/listing/Listingcard";
import { SafeListing } from "@/types";
import { Additional } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface PropertiClientProps {
  listings: SafeListing[];
}
const PropertiClient: React.FC<PropertiClientProps> = ({ listings }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Properties deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <div className="grid  grid-cols-1 sm:grid-cols-8  gap-5  mt-6">
      {listings.map((listing) => (
        <ListingCard
          data={listing}
          key={listing.id}
          disabled={deletingId === listing.id}
          onAction={onCancel}
          actionLabel="Delete Property"
          actionId={listing.id}
          edit
        />
      ))}
    </div>
  );
};

export default PropertiClient;
