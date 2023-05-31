import getAdmin from "@/components/actions/getAdmin";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const admin = await getAdmin();
  if (!admin) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { name, img } = body;
  try {
    const promosi = await prisma.hero.create({
      data: {
        name,
        img,
        adminId: admin.id,
      },
    });
    return NextResponse.json(promosi);
  } catch (error) {
    return NextResponse.error();
  }
}
