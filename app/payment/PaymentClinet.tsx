"use client";

import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../../types";
import { useCallback, useState, useEffect } from "react";
import Container from "../../components/shared/Container";
import Heading from "../../components/shared/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../../components/listing/Listingcard";
import Cookies from "js-cookie";

interface PaymentClientProps {
  currentUser: SafeUser | null;
  reservations: SafeReservation[];
}

const PaymentClient: React.FC<PaymentClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Shometing went wrong");
          console.error(error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  function hapusElemenDariServer() {
    if (reservations.length > 0) {
      for (let i = 0; i < reservations.length; i++) {
        const idElemen = reservations[i].id;

        axios
          .delete(`/api/reservations/${idElemen}`)
          .then(() => {
            toast.success("Reservation cancelled");
            router.refresh();
          })
          .catch((error) => {
            toast.error("Shometing went wrong");
            console.error(error);
          });
      }
    } else {
      console.log("Tidak ada elemen dalam array reservations.");
    }
  }

  let timeoutID;

  function setTimer() {
    timeoutID = setTimeout(() => {
      hapusElemenDariServer();
    }, 60000);

    // Menyimpan timer dalam cookies
    Cookies.set("timeoutID", timeoutID.toString(), { expires: 1 / (24 * 60) }); // Kadaluwarsa dalam 1 menit
  }

  function clearTimer() {
    const timeoutID = Cookies.get("timeoutID");

    if (timeoutID) {
      clearTimeout(parseInt(timeoutID));
      // Menghapus cookies
      Cookies.remove("timeoutID");
    }
  }
  useEffect(() => {
    // Memeriksa apakah ada timer yang sebelumnya disimpan dalam cookies
    clearTimer();

    setTimer();

    // Menyimpan timer saat halaman diperbarui atau berpindah halaman
    window.addEventListener("beforeunload", clearTimer);

    return () => {
      window.removeEventListener("beforeunload", clearTimer);
    };
  }, []);

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Booking on your properties"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            actionId={reservation.id}
            reservation={reservation}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            payment
          />
        ))}
      </div>
    </Container>
  );
};

export default PaymentClient;
