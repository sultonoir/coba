import Container from "@/components/shared/Container";
import React from "react";
import PropertiClient from "./PropertiClient";
import RentInput from "@/components/inputs/RentInput";
import getAdmin from "@/components/actions/getAdmin";
import getListings from "@/components/actions/getListings";
import PropertiHero from "./PropertiHero";
import getPromosi from "@/components/actions/getPromosi";

const page = async () => {
  const admin = await getAdmin();
  if (!admin) {
    return null;
  }
  const listings = await getListings({ adminId: admin.id });
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
