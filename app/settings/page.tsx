import getCurrentUser from "@/components/actions/getCurrentUser";
import React from "react";
import UserClient from "./UserClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const page = async () => {
  const user = await getCurrentUser();
  return <UserClient user={user} />;
};

export default page;
