import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

interface IParams {
  userId: string;
}

export default async function getProperties(params: IParams) {
  const { userId } = params;
  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
