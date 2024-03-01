import { db } from "@/lib/db";

export default async function getBookings() {
  try {
    const data = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        buyer: true,
        event: true,
      },
    });

    return {
      data: data,
      status: 200,
    };
  } catch {
    return {
      status: 500,
    };
  }
}
