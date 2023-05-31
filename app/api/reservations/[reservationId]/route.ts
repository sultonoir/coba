import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import getAdmin from "@/components/actions/getAdmin";
import getCurrentUser from "@/components/actions/getCurrentUser";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ adminId: user.adminId }, { listing: { adminId: admin.id } }],
    },
  });

  return NextResponse.json(reservation);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const body = await request.json();
  const { status, room } = body;
  const { reservationId } = params;
  try {
    const reservation = await prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status,
        listing: {
          update: {
            roomCount: {
              increment: room,
            },
          },
        },
        user: {
          update: {
            notifi: {
              create: {
                message:
                  "thank you for staying at our hotel, don't forget to give ratings",
              },
            },
            notification: true,
          },
        },
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.json({ message: "Error" });
  }
}
