import prisma from "@/libs/prisma";

export default async function getEditListing(listingId: string) {
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      admin: true,
    },
  });
  if (!listing) {
    return null;
  }
  return {
    ...listing,
    createdAt: listing.createdAt.toISOString(),
    user: {
      ...listing.admin,
      createdAt: listing.admin.createdAt.toISOString(),
      updatedAt: listing.admin.updatedAt.toISOString(),
    },
  };
}
