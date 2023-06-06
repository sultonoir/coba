import React from "react";
import { Metadata } from "next";
import FacilityClient from "./FacilityClient";

export const metadata: Metadata = {
  title: "facility",
};

const page = () => {
  return <FacilityClient />;
};

export default page;
