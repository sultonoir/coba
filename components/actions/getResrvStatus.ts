import prisma from "@/libs/prisma";
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
  complete?: string;
  completed?: string;
}

export default async function getResrvStatus(params: IParams) {
  const { listingId, userId, authorId, complete, completed } = params;

  const query: any = {};

  if (listingId) {
    query.listingId = listingId;
  }

  if (userId) {
    query.status = "pending";
    query.userId = userId;
  }

  if (complete) {
    const user = await prisma.user.findUnique({
      where: {
        id: complete,
      },
    });

    if (user?.notification) {
      await prisma.user.update({
        where: {
          id: complete,
        },
        data: {
          notification: false,
        },
      });
    }

    query.status = "Complete";
    query.userId = complete;
  }

  if (completed) {
    query.status = "Completed";
    query.userId = completed;
  }

  try {
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
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
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
