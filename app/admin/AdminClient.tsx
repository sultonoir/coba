"use client";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useData from "@/hooks/useData";
import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";
import AdminDatepick from "@/components/admin/AdminDatepick";
import { SafeListing } from "@/types";
import { Hero } from "@prisma/client";
import AdminDashboard from "@/components/admin/AdminDashboard";

interface AdminClientProps {
  rooms: SafeListing[];
  promosi: Hero[];
}

const AdminClient: React.FC<AdminClientProps> = ({ rooms, promosi }) => {
  const { data, error, isLoading } = useData("/api/reservAdmin");

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <EmptyState />;
  }

  const datas = data?.map((data: any) => ({
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
    created: data.createdAt,
  }));
  return (
    <>
      <AdminDashboard
        reservation={datas}
        rooms={rooms}
        promosi={promosi}
      />
      <DataTable
        columns={columns}
        data={datas}
      />
    </>
  );
};

export default AdminClient;
