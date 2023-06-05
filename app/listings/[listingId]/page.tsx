import getCurrentUser from "@/components/actions/getCurrentUser";
import getLIstingById from "@/components/actions/getListingById";
import EmptyState from "@/components/shared/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/components/actions/getReservations";
import getAdmin from "@/components/actions/getAdmin";

interface Iparams {
  listingId?: string;
}

export async function generateMetadata({ params }: { params: Iparams }) {
  const user = await getLIstingById(params);
  return {
    title: user?.title,
  };
}

const page = async ({ params }: { params: Iparams }) => {
  const listing = await getLIstingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  const admin = await getAdmin();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      admin={admin}
    />
  );
};

export default page;
