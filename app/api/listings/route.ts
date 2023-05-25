import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { stripe } from "@/libs/stripe";
import getAdmin from "@/components/actions/getCurrentAdmin";

export async function POST(request: Request) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.error();
  }
  const body = await request.json();
  const {
    img,
    title,
    description,
    price,
    roomCount,
    guestCount,
    category,
    fasilitas,
  } = body;
  const listings = await prisma.listing.create({
    data: {
      imageSrc: img,
      title,
      description,
      price: parseInt(price, 10),
      roomCount: parseInt(roomCount, 10),
      guestCount: parseInt(guestCount, 10),
      category,
      fasilitas,
    },
  });
  await stripe.products.create({
    name: title,
    images: img,
    metadata: {
      userId: admin.id,
    },
    default_price_data: {
      currency: "idr",
      unit_amount: parseInt(price, 10),
    },
  });

  return NextResponse.json(listings);
}
