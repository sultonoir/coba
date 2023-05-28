import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { id } = params;

  const additionals = await prisma.additional.deleteMany({
    where: {
      listingId: id,
    },
  });
  return NextResponse.json(additionals);
}
