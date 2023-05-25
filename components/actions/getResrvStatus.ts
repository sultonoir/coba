import prisma from "@/libs/prisma";
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
  userSucces?: string;
  userCompletedByHost?: string;
  userCompleted?: string;
  hostSucces?: string;
  hostCompletedByHost?: string;
  hostComplted?: string;
}

export default async function getResrvStatus(params: IParams) {
  const {
    listingId,
    userId,
    authorId,
    userSucces,
    userCompleted,
    userCompletedByHost,
    hostSucces,
    hostCompletedByHost,
    hostComplted,
  } = params;

  const query: any = {};

  if (listingId) {
    query.listingId = listingId;
  }

  if (userId) {
    query.status = "pending";
    query.userId = userId;
  }

  if (authorId) {
    const user = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (user?.notification) {
      await prisma.user.update({
        where: {
          id: authorId,
        },
        data: {
          notification: false,
        },
      });
    }

    query.listing = { userId: authorId };
  }

  if (userSucces) {
    query.status = "success";
    query.userId = userSucces;
  }
  if (userCompletedByHost) {
    query.status = "completedByhost";
    query.userId = userCompletedByHost;
  }
  if (userCompleted) {
    query.status = "completed";
    query.userId = userCompleted;
  }

  if (hostSucces) {
    query.status = "success";
    query.listing = { userId: hostSucces };
  }

  if (hostCompletedByHost) {
    query.status = "completedByHost";
    query.listing = { userId: hostCompletedByHost };
  }
  if (hostComplted) {
    query.status = "completed";
    query.listing = { userId: hostComplted };
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
