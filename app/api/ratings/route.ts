import getCurrentUser from "@/components/actions/getCurrentUser";
import prisma from "@/libs/prisma";
import { pusherServer } from "@/libs/pusher";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const user = await getCurrentUser();
  if (!user || !user.adminId) {
    return NextResponse.error;
  }
  const body = await req.json();
  const { message, value, type, reservationId } = body;
  try {
    const ratings = await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status: "Completed",
        rating: {
          create: {
            message,
            value,
            type: type.value,
            userId: user.id,
            adminId: user.adminId,
          },
        },
        admin: {
          update: {
            notifi: {
              create: {
                message: "Memberikan ratings",
                guestName: user.name,
                guestImage: user.image,
              },
            },
            notification: true,
          },
        },
      },
    });
    const notifications = await prisma.admin.findUnique({
      where: {
        id: user.adminId,
      },
      include: {
        notifi: true,
      },
    });
    pusherServer.trigger("getR", "newratings", notifications);
    return NextResponse.json(ratings);
  } catch (error) {
    return NextResponse.error();
  }
};
