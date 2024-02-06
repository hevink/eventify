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
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    console.log("New order created", newOrder);

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

// GET ORDERS BY USER
// export async function getOrdersByUser({
//   userId,
//   limit = 3,
//   page,
// }: GetOrdersByUserParams) {
//   try {
//     await connectToDatabase();

//     const skipAmount = (Number(page) - 1) * limit;
//     const conditions = { buyer: userId };

//     const orders = await Order.distinct("event._id")
//       .find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit)
//       .populate({
//         path: "event",
//         model: Event,
//         populate: {
//           path: "organizer",
//           model: User,
//           select: "_id firstName lastName",
//         },
//       });

//     const ordersCount = await Order.distinct("event._id").countDocuments(
//       conditions
//     );

//     return {
//       data: JSON.parse(JSON.stringify(orders)),
//       totalPages: Math.ceil(ordersCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// }
