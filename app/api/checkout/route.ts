import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const newOrder = await db.order.create({
      data: {
        stripeId: body.stripeId,
        eventId: body.eventId,
        buyerId: body.buyerId,
        totalAmount: body.eventId,
        eventTitle: body.eventTitle,
      },
    });

    return NextResponse.json({ message: "OK", order: newOrder });
  } catch (error) {
    NextResponse.json({ message: "Error creating order", error });
  }
}
