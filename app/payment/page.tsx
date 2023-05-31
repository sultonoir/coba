import getResrvStatus from "@/components/actions/getResrvStatus";
import getCurrentUser from "../../components/actions/getCurrentUser";
import getReservations from "../../components/actions/getReservations";
import EmptyState from "../../components/shared/EmptyState";
import PaymentClient from "./PaymentClinet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pembayaran",
  description: "bayar reservasi anda",
};

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Tidak terhubung"
        subtitle="Login terlebih dahulu"
      />
    );
  }

  const reservation = await getResrvStatus({ userId: currentUser.id });

  if (reservation.length === 0) {
    return (
      <EmptyState
        title="Tidak ada perjalanan"
        subtitle="Buat perjalanan terlebih dahulu"
      />
    );
  }
  return (
    <PaymentClient
      currentUser={currentUser}
      reservations={reservation}
    />
  );
};

export default TripsPage;
