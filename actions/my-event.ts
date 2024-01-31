"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const myEvent = async () => {
  try {
    const session = await auth();

    const myEvents = await db.event.findMany({
      where: {
        eventId: session?.user.id || "",
      },
    });

    return myEvents;
  } catch (error) {
    return { error, status: 400 };
  }
};
