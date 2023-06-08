import prisma from "@/libs/prisma";

export const getAllListing = async () => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        price: "asc",
      },
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    throw new Error();
  }
};
