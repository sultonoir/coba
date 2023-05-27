import prisma from "@/libs/prisma";

interface Iparams {
  listingId?: string;
}

export default async function getLIstingById(params: Iparams) {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        additional: true,
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
  } catch (error: any) {
    throw new error(error);
  }
}
