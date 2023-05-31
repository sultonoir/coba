import prisma from "@/libs/prisma";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
  reservationId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId, reservationId } = params;

    const query: any = {};

    switch (true) {
      case Boolean(listingId):
        query.listingId = listingId;
        break;
      case Boolean(userId):
        query.userId = userId;
        break;
      case Boolean(authorId):
        query.listing = { adminId: authorId };
        break;
      case Boolean(reservationId):
        query.reservationId = reservationId;
        break;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      endDate: reservation.endDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
