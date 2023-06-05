import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  userId: string;
}
export const GET = async (
  req: NextRequest,
  { params }: { params: IParams }
) => {
  const { userId } = params;

  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID");
  }
  try {
    const reservations = await prisma.notification.findMany({
      where: {
        userId,
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
