import React from "react";
import SuccessClient from "./SuccessClient";
import { Metadata } from "next";

interface Iparams {
  reservationId: string;
}
export const metadata: Metadata = {
  title: "Success",
  description: "Success payment",
};

const page = ({ params }: { params: Iparams }) => {
  return <SuccessClient params={{ id: params.reservationId }} />;
};

export default page;
