import getAdmin from "@/components/actions/getAdmin";
import EmptyState from "@/components/shared/EmptyState";
import React from "react";
import AdminClient from "./AdminClient";
import Container from "@/components/shared/Container";
import { Metadata } from "next";
import getListingAdmin from "@/components/actions/getlListingsAdmin";
import getPromosi from "@/components/actions/getPromosi";

export const metadata: Metadata = {
  title: "Dashboard",
};

const page = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return (
      <EmptyState
        title="not admins"
        subtitle="back to main page"
        showReset
      />
    );
  }
  const listings = await getListingAdmin({ adminId: admin.id });
  const promosi = await getPromosi();

  return (
    <Container>
      <AdminClient
        rooms={listings}
        promosi={promosi}
      />
    </Container>
  );
};

export default page;
