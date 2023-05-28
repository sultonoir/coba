import prisma from "@/libs/prisma";
import getAdmin from "@/components/actions/getCurrentAdmin";
import { NextResponse } from "next/server";
import getLIstingById from "@/components/actions/getListingById";
import { Additional } from "@prisma/client";

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
    additional,
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
      additional: {
        create: additional.map((item: Additional) => ({
          name: item.name,
          cost: item.cost,
        })),
      },
    },
    include: {
      additional: true,
    },
  });

  return NextResponse.json(listing);
}
