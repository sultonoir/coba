import React from "react";
import SettingsClient from "./SettingsClient";
import getAdmin from "@/components/actions/getAdmin";

const page = async () => {
  const admin = await getAdmin();
  return <SettingsClient admin={admin} />;
};

export default page;
