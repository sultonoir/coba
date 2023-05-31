import prisma from "@/libs/prisma";

export default async function getPromosi() {
  try {
    const promosi = await prisma.hero.findMany({});
    return promosi;
  } catch (error) {
    throw new Error();
  }
}
