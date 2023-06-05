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
      <div className="grid pt-24 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
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