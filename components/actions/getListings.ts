import prisma from "@/libs/prisma";

export interface IListingsParams {
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { roomCount, guestCount } = params;

    let query: any = {};
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        price: "asc",
      },
    });

    const safeListings = listings
      .filter((listing) => listing.roomCount !== 0)
      .map((listing) => ({
        ...listing,
        createdAt: listing.createdAt.toISOString(),
      }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
