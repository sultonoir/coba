import prisma from "@/libs/prisma";
import { pusherServer } from "@/libs/pusher";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { adminId, notification } = body;

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
    });

    if (admin?.notification === false) {
      // Jika notification sudah false, kembalikan admin tanpa melakukan pembaruan
      return NextResponse.json(admin);
    }

    // Jika notification belum false, lakukan pembaruan
    const updatedAdmin = await prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        notification,
      },
      include: {
        notifi: true,
      },
    });

    pusherServer.trigger("getT", "true", updatedAdmin);

    return NextResponse.json(updatedAdmin);
  } catch (error) {
    return NextResponse.error();
  }
};
