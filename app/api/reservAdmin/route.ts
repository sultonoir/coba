import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prisma";
import getAdmin from "@/components/actions/getAdmin";
import { differenceInDays } from "date-fns";

export async function POST(request: Request) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { listing, startDate, endDate, status, guestName, roomCount } = body;

  const { id, price } = listing;
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);
  const dayCount = differenceInDays(newEndDate, newStartDate);

  let totalPrice;
  if (dayCount === 0) {
    totalPrice = price;
  } else {
    totalPrice = dayCount * price;
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: id,
    },
    data: {
      roomCount: {
        decrement: parseInt(roomCount, 10),
      },
      reservations: {
        create: {
          startDate,
          endDate,
          totalPrice,
          status,
          guestName,
          adminId: admin.id,
          rooms: parseInt(roomCount, 10),
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}

export const GET = async (req: NextRequest) => {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        listing: true,
        user: true,
      },
    });
    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.error();
  }
};
