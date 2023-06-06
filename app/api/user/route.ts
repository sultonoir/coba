import prisma from "@/libs/prisma";
import { pusherServer } from "@/libs/pusher";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { userId, notification } = body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user?.notification === false) {
      // Jika notification sudah false, kembalikan user tanpa melakukan pembaruan
      return NextResponse.json(user);
    }

    // Jika notification belum false, lakukan pembaruan
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        notification,
      },
      include: {
        notifi: true,
      },
    });

    pusherServer.trigger("getT", "true", updatedUser);

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.error();
  }
};

export const PUT = async (request: Request) => {
  const body = await request.json();
  const { userId, image, password, name, email } = body;
  const dataToUpdate: any = {};

  if (image) {
    dataToUpdate.image = image;
  }

  if (name) {
    dataToUpdate.name = name;
  }

  if (email) {
    dataToUpdate.email = email;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    dataToUpdate.hashedPassword = hashedPassword;
  }
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: dataToUpdate,
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error();
  }
};
