import prisma from "@/libs/prisma";

interface IParams {
  adminId?: string;
}

export default async function getListingAdmin(params: IParams) {
  const { adminId } = params;
  let query: any = {};

  if (adminId) {
    query.adminId = adminId;
  }

  const listings = await prisma.listing.findMany({
    where: query,
    orderBy: {
      createdAt: "desc",
    },
  });

  const safeListings = listings.map((listing) => ({
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  }));

  return safeListings;
}
