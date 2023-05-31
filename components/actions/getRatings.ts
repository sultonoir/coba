import prisma from "@/libs/prisma";

export default async function getRatings() {
  try {
    const rating = await prisma.rating.findMany({});
    return rating;
  } catch (eror) {
    throw new Error();
  }
}
