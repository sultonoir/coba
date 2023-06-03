import getAdmin from "@/components/actions/getAdmin";
import EmptyState from "@/components/shared/EmptyState";
import React from "react";
import AdminClient from "./AdminClient";

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

  return (
    <div className="container mx-auto py-10">
      <AdminClient />
    </div>
  );
};

export default page;
