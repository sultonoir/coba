import HomeHero from "@/components/Home/HomeHero";
import HomeNavigations from "@/components/Home/HomeNavigations";
import HomeProfile from "@/components/Home/HomePofile";
import HomePromosi from "@/components/Home/HomePromosi";
import getListings, { IListingsParams } from "@/components/actions/getListings";
import getPromosi from "@/components/actions/getPromosi";
import getRatings from "@/components/actions/getRatings";
import Container from "@/components/shared/Container";
import EmptyState from "@/components/shared/EmptyState";
interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const ratings = await getRatings();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  const promosi = await getPromosi();
  return (
    <Container>
      <HomeHero listings={listings} />
      <HomeProfile ratings={ratings} />
      <HomeNavigations />
      <HomePromosi promosi={promosi} />
    </Container>
  );
}
