import Container from "@/components/shared/Container";
import React from "react";
import PropertiClient from "./PropertiClient";
import RentInput from "@/components/inputs/RentInput";
import getAdmin from "@/components/actions/getAdmin";
import PropertiHero from "./PropertiHero";
import getPromosi from "@/components/actions/getPromosi";
import getListingAdmin from "@/components/actions/getlListingsAdmin";

const page = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return null;
  }
  const listings = await getListingAdmin({ adminId: admin.id });
  const promosi = await getPromosi();
  return (
    <Container>
      <div className="mb-5">
        <RentInput />
      </div>
      <PropertiClient listings={listings} />
      <PropertiHero promosi={promosi} />
    </Container>
  );
};

export default page;
