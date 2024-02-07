"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const checkoutOrder = async (order: any) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: any) => {
  try {
    const newOrder = await db.order.create({
      data: {
        stripeId: order.stripeId,
        eventId: order.eventId,
        buyerId: order.buyerId,
        totalAmount: order.eventId,
        eventTitle: order.eventTitle,
      },
    });

    return NextResponse.json({ message: "OK", order: newOrder });
  } catch (error) {
    console.log(error);
  }
};

// GET ORDERS BY EVENT
export async function getOrdersByEvent({ eventId }: any) {
  try {
    if (!eventId) throw new Error("Event ID is required");

    const orders = await db.order.findMany({
      where: {
        eventId: eventId,
      },
    });

    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getOrdersByUser({ userId }: { userId: string }) {
  const users = await db.order.findMany({
    where: {
      buyerId: userId,
    },
    select: {
      event: true,
    },
  });

  return users;
}

export async function getEventsByUser({ userId }: { userId: string }) {
  const events = await db.event.findMany({
    where: {
      eventId: userId,
    },
  });

  return events;
}
