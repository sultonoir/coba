import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { stripe } from "@/libs/stripe";
import getAdmin from "@/components/actions/getAdmin";

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
    fasilitas,
    bed,
  } = body;

  const listings = await prisma.listing.create({
    data: {
      imageSrc: img,
      title,
      description,
      price: parseInt(price, 10),
      roomCount: parseInt(roomCount, 10),
      guestCount: parseInt(guestCount, 10),
      bed: parseInt(bed, 10),
      fasilitas,
      adminId: admin.id,
    },
  });
  await stripe.products.create({
    name: title,
    images: img,
    metadata: {
      userId: admin.id,
    },
    default_price_data: {
      currency: "usd",
      unit_amount: parseInt(price, 10),
    },
  });

  return NextResponse.json(listings);
}
export async function PUT(request: Request) {
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
    fasilitas,
    bed,
    listingId,
    discount,
  } = body;
  const listing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      imageSrc: img,
      title,
      description,
      price: parseInt(price, 10),
      roomCount: parseInt(roomCount, 10),
      guestCount: parseInt(guestCount, 10),
      bed: parseInt(bed, 10),
      fasilitas,
      adminId: admin.id,
      discount: parseInt(discount, 10),
    },
  });

  return NextResponse.json(listing);
}
