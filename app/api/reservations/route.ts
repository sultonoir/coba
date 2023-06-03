import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prisma";
import getCurrentUser from "@/components/actions/getCurrentUser";

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
    if (!currentUser) {
      return NextResponse.error();
    }
    const { status, reservationId } = await request.json();

    if (!status || !reservationId) {
      return NextResponse.json({ message: "Tidak ada status" });
    }

    await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status,
        listing: {
          update: {
            notifi: {
              create: {
                message: "Mereservasi",
                guestName: currentUser.name,
                guestImage: currentUser.image,
                adminId: currentUser.adminId,
                reservationId: reservationId,
              },
            },
            admin: {
              update: {
                notification: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err: any) {
    return NextResponse.error();
  }
};
