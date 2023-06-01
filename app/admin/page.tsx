import getAdmin from "@/components/actions/getAdmin";
import getReservations from "@/components/actions/getReservations";
import EmptyState from "@/components/shared/EmptyState";
import React from "react";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

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

  const reservations = await getReservations({ authorId: admin?.id });
  const data = reservations.map((data) => ({
    id: data.id,
    amount: data.totalPrice,
    status: data.status,
    name: data.guestName,
    checkin: data.startDate,
    checkout: data.endDate,
    rooms: data.rooms,
    title: data.listing.title,
    email: data.user?.email,
    userId: data.userId,
  }));

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default page;
