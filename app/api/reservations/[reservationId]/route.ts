import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import getAdmin from "@/components/actions/getAdmin";
import getCurrentUser from "@/components/actions/getCurrentUser";
import { pusherServer } from "@/libs/pusher";

interface IParams {
  reservationId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const res = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
  });

  const listings = await prisma.listing.update({
    where: {
      id: res?.listingId,
    },
    data: {
      roomCount: {
        increment: res?.rooms,
      },
      reservations: {
        deleteMany: {
          id: res?.id,
          listingId: res?.listingId,
          userId: res?.userId,
          adminId: res?.adminId,
        },
      },
    },
  });

  return NextResponse.json(listings);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { status, room, userId } = body;
  const { reservationId } = params;

  let update: any = {};

  if (userId !== null) {
    update.status = status;
    update.listing = {
      update: {
        roomCount: {
          increment: room,
        },
      },
    };
    if (status !== "Completed") {
      update.user = {
        update: {
          notifi: {
            create: {
              message:
                "thank you for staying at our hotel, don't forget to give ratings",
              guestName: admin.name,
              guestImage: admin.image,
            },
          },
          notification: true,
        },
      };
    }
  } else {
    update.status = status;
    update.listing = {
      update: {
        roomCount: {
          increment: room,
        },
      },
    };
  }

  try {
    const reservation = await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: update,
    });

    const notification = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        notifi: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    await pusherServer.trigger("get", "newN", notification);
    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.error();
  }
}
