import prisma from "@/libs/prisma";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}
export default async function getNotifications(params: IParams) {
  const { listingId, userId, authorId } = params;
  const query: any = {};

  if (listingId) {
    query.listingId = listingId;
  }

  if (userId) {
    query.userId = userId;
  }

  if (authorId) {
    query.listing = { userId: authorId };
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safenotifications = notifications.map((notif) => ({
      ...notif,
      createdAt: notif.createdAt.toISOString(),
    }));
    return safenotifications;
  } catch (error) {
    throw new Error();
  }
}
