import Container from "@/components/shared/Container";
import React from "react";
import PropertiClient from "./PropertiClient";
import RentInput from "@/components/inputs/RentInput";
import getAdmin from "@/components/actions/getAdmin";
import getListings from "@/components/actions/getListings";

const page = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return null;
  }
  const listings = await getListings({ adminId: admin.id });
  return (
    <Container>
      <div className="mb-5">
        <RentInput />
      </div>
      <PropertiClient listings={listings} />
    </Container>
  );
};

export default page;
