import { getAllListing } from "@/components/actions/getAllListing";
import getCurrentUser from "@/components/actions/getCurrentUser";
import ListingCard from "@/components/listing/Listingcard";
import Container from "@/components/shared/Container";
import EmptyState from "@/components/shared/EmptyState";

const page = async () => {
  const listings = await getAllListing();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-8 gap-5 mt-6">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default page;
