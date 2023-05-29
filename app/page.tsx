import HomeHero from "@/components/Home/HomeHero";
import getCurrentUser from "@/components/actions/getCurrentUser";
import getListings, { IListingsParams } from "@/components/actions/getListings";
import Container from "@/components/shared/Container";
import EmptyState from "@/components/shared/EmptyState";
interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <HomeHero listings={listings} />
    </Container>
  );
}
