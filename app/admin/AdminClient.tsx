"use client";

import ImageUpload from "@/components/inputs/ImageUpload";
import Container from "@/components/shared/Container";
import EmptyState from "@/components/shared/EmptyState";
import { SafeAdmin } from "@/types";
import React from "react";

interface AdminClientProps {
  admin: SafeAdmin | null;
}

const AdminClient: React.FC<AdminClientProps> = ({ admin }) => {
  if (!admin) {
    return <EmptyState />;
  }
  return (
    <Container>
      <div></div>
    </Container>
  );
};

export default AdminClient;
