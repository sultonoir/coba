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
  complete: SafeReservation[];
  completed: SafeReservation[];
}

const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
  complete,
  completed,
}) => {
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Your trips history"
      />
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {complete.map((reservation) => {
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
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {completed.map((reservation) => {
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
