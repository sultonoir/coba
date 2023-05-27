import { NextRequest, NextResponse } from "next/server";

import getCurrentUser from "@/components/actions/getCurrentUser";
import prisma from "@/libs/prisma";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}

export const GET = async (
  request: NextRequest,
  { params }: { params: IParams }
) => {
  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  try {
    const reservation = await prisma.reservation.findMany({
      where: {
        id: reservationId,
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.log(error);
  }
};
