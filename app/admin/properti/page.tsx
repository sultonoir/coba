import Container from "@/components/shared/Container";
import React from "react";
import PropertiClient from "./PropertiClient";
import RentInput from "@/components/inputs/RentInput";

const page = async () => {
  return (
    <Container>
      <div className="mb-5">
        <RentInput />
      </div>
      <PropertiClient />
    </Container>
  );
};

export default page;
