import getAdmin from "@/components/actions/getCurrentAdmin";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface IParams {
  listingId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("invailid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      adminId: admin.id,
    },
  });

  return NextResponse.json(listing);
}
