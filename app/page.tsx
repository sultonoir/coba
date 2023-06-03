import getPromosi from "@/components/actions/getPromosi";
import getRatings from "@/components/actions/getRatings";
import HomeClient from "./HomeClient";
import { getAllListing } from "@/components/actions/getAllListing";

export default async function Home() {
  const ratings = await getRatings();
  const promosi = await getPromosi();
  const listings = await getAllListing();
  return (
    <HomeClient
      listings={listings}
      ratings={ratings}
      promosi={promosi}
    />
  );
}
