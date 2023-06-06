import prisma from "@/libs/prisma";

export default async function getRatings() {
  try {
    const rating = await prisma.rating.findMany({
      include: {
        user: true,
      },
    });
    const safeRating = rating.map((rat) => ({
      ...rat,
    }));
    return safeRating;
  } catch (eror) {
    throw new Error();
  }
}
