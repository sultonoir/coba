import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prisma";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getAdmin() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.admin.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        notifi: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}
