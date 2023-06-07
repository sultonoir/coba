import prisma from "@/libs/prisma";
import { pusherServer } from "@/libs/pusher";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import getAdmin from "@/components/actions/getAdmin";

export const POST = async (request: Request) => {
  const admins = await getAdmin();
  if (!admins) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { notification } = body;

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: admins.id,
      },
    });

    if (admin?.notification === false) {
      return NextResponse.json(admin);
    }

    const updatedAdmin = await prisma.admin.update({
      where: {
        id: admins.id,
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

export const PUT = async (request: Request) => {
  const body = await request.json();
  const { adminId, image, password, name, email } = body;
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
    const admin = await prisma.admin.update({
      where: {
        id: adminId,
      },
      data: dataToUpdate,
    });
    return NextResponse.json(admin);
  } catch (error) {
    return NextResponse.error();
  }
};
