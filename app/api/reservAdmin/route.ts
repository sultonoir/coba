import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prisma";
import getAdmin from "@/components/actions/getAdmin";
import { differenceInDays } from "date-fns";
import { stripe } from "@/libs/stripe";

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

  try {
    const successUrl = `https://kyoukahotel.vercel.app/`;
    const cancelUrl = `https://kyoukahotel.vercel.app/payment`;

    const listings = await prisma.listing.findUnique({
      where: {
        id: id,
      },
    });

    if (!listings) {
      return null;
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
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "idr",
            product_data: {
              name: listings.title,
              images: listings.imageSrc,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        guestName,
        id,
        daminId: admin.name,
      },
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    return NextResponse.error();
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        listing: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.error();
  }
};
