import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  adminId: string;
}
export const GET = async (
  req: NextRequest,
  { params }: { params: IParams }
) => {
  const { adminId } = params;

  if (!adminId || typeof adminId !== "string") {
    throw new Error("Invalid ID");
  }

  if (adminId) {
    await prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        notification: false,
      },
    });
  }

  try {
    const reservations = await prisma.notification.findMany({
      where: {
        adminId,
      },
      include: {
        listing: true,
        reservation: true,
      },
    });
    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.error();
  }
};
