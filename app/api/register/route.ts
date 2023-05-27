import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { stripe } from "@/libs/stripe";
import getAdm from "@/components/actions/getAdm";

export async function POST(request: Request) {
  const admin = await getAdm();
  const body = await request.json();
  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email: email,
      name: name,
      hashedPassword: hashedPassword,
      adminId: admin.id,
    },
  });

  await stripe.customers.create({
    email,
    name,
    metadata: {
      adminId: admin.id,
    },
  });
  return NextResponse.json(user);
}
