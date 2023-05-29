import { NextRequest, NextResponse } from "next/server";

import getadmin from "@/components/actions/getCurrentUser";
import prisma from "@/libs/prisma";
import getAdmin from "@/components/actions/getAdmin";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
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
      OR: [{ adminId: admin.id }, { listing: { adminId: admin.id } }],
    },
  });

  return NextResponse.json(reservation);
}
