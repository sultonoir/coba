import prisma from "@/libs/prisma";

interface Iparams {
  listingId?: string;
}

export default async function getLIstingById(params: Iparams) {
  try {
    const { listingId } = params;
    const user = await prisma.user.findUnique({
      where: {
        id: listingId,
      },
    });

    if (user?.notification) {
      await prisma.user.update({
        where: {
          id: listingId,
        },
        data: {
          notification: false,
        },
      });
    }
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
        rating: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new error(error);
  }
}
