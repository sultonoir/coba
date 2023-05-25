import prisma from "@/libs/prisma";

export default async function getAdm() {
  try {
    const admin = await prisma.admin.findMany({});
    const [safeAdmin] = admin.map((adm) => ({
      ...adm,
      createdAt: adm.createdAt.toISOString(),
      updatedAt: adm.updatedAt.toISOString(),
    }));

    return safeAdmin;
  } catch (error: any) {
    console.log(error);
    throw new Error();
  }
}
