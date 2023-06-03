"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useData from "@/hooks/useData";
import Loader from "@/components/shared/Loader";
import EmptyState from "@/components/shared/EmptyState";

const AdminClient = () => {
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
  }));
  return (
    <div>
      <DataTable
        columns={columns}
        data={datas}
      />
    </div>
  );
};

export default AdminClient;
