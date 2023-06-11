"use client";
import { useCallback, useState, useEffect } from "react";
import { SafeReservation, SafeUser } from "../../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "../../components/shared/Container";
import Heading from "../../components/shared/Heading";
import ListingCard from "../../components/listing/Listingcard";
import EmptyState from "@/components/shared/EmptyState";
interface TripsClientProps {
  currentUser: SafeUser | null;
  history: SafeReservation[];
}

const TripsClient: React.FC<TripsClientProps> = ({ currentUser, history }) => {
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Your trips history"
      />
      <div className="grid grid-cols-1 sm:grid-cols-8 gap-5 mt-6">
        {history
          .filter((i) => i.status === "Completed")
          .map((reservation) => {
            return (
              <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                currentUser={currentUser}
                completed
              />
            );
          })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-8 gap-5 mt-6">
        {history
          .filter((i) => i.status === "Added ratings")
          .map((reservation) => {
            return (
              <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                currentUser={currentUser}
              />
            );
          })}
      </div>
    </Container>
  );
};

export default TripsClient;
