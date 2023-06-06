import getCurrentUser from "@/components/actions/getCurrentUser";
import React from "react";
import UserClient from "./UserClient";

const page = async () => {
  const user = await getCurrentUser();
  return <UserClient user={user} />;
};

export default page;
