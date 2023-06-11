import getResrvStatus from "@/components/actions/getResrvStatus";
import getCurrentUser from "../../components/actions/getCurrentUser";
import EmptyState from "../../components/shared/EmptyState";
import TripsClient from "./TripsClient";
import { Metadata } from "next";
import getReservations from "@/components/actions/getReservations";

export const metadata: Metadata = {
  title: "Trips",
  description: "Your trips history",
};

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Not connected"
        subtitle="Sign in first"
      />
    );
  }

  const history = await getReservations({ userId: currentUser.id });

  return (
    <TripsClient
      currentUser={currentUser}
      history={history}
    />
  );
};

export default TripsPage;
