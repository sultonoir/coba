import getAdmin from "@/components/actions/getAdmin";
import EmptyState from "@/components/shared/EmptyState";
import React from "react";
import AdminClient from "./AdminClient";

const page = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return <EmptyState />;
  }

  return <AdminClient admin={admin} />;
};

export default page;
