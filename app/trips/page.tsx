import getResrvStatus from "@/components/actions/getResrvStatus";
import getCurrentUser from "../../components/actions/getCurrentUser";
import EmptyState from "../../components/shared/EmptyState";
import TripsClient from "./TripsClient";
import { Metadata } from "next";

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

  const reservation = await getResrvStatus({ userSucces: currentUser.id });
  const completedByhost = await getResrvStatus({
    userCompletedByHost: currentUser.id,
  });
  const completed = await getResrvStatus({ userCompleted: currentUser.id });

  return (
    <TripsClient
      currentUser={currentUser}
      reservations={reservation}
      completedByhost={completedByhost}
      completed={completed}
    />
  );
};

export default TripsPage;
