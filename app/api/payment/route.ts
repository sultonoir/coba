import { stripe } from "@/libs/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { totalPrice, title, image, userId, reservationId } = body;
  try {
    const successUrl = `http://localhost:3000/success/${reservationId}`;
    const cancelUrl = `http://localhost:3000/payment`;

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              images: image,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        reservationId,
      },
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
