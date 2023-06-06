import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prisma";
import getCurrentUser from "@/components/actions/getCurrentUser";
import { pusherServer } from "@/libs/pusher";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    listingId,
    startDate,
    endDate,
    totalPrice,
    status,
    userId,
    guestName,
    guestImage,
    adminId,
    rooms,
  } = body;

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      roomCount: {
        decrement: rooms,
      },
      reservations: {
        create: {
          userId,
          startDate,
          endDate,
          totalPrice,
          status,
          guestName,
          guestImage,
          adminId,
          rooms,
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}

export const PUT = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.adminId) {
      return NextResponse.error();
    }
    const { status, reservationId } = await request.json();

    if (!status || !reservationId) {
      return NextResponse.json({ message: "Tidak ada status" });
    }

    const reservation = await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status,
        listing: {
          update: {
            admin: {
              update: {
                notifi: {
                  create: {
                    message: "Mereservasi",
                    guestName: currentUser.name,
                    guestImage: currentUser.image,
                    reservationId: reservationId,
                  },
                },
                notification: true,
              },
            },
          },
        },
      },
      include: {
        admin: true,
        notifi: true,
      },
    });

    const notifications = await prisma.admin.findUnique({
      where: {
        id: currentUser.adminId,
      },
      include: {
        notifi: true,
      },
    });

    pusherServer.trigger("get", "newreservation", notifications);
    return NextResponse.json(reservation);
  } catch (err: any) {
    return NextResponse.error();
  }
};
