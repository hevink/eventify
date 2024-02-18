"use server";

import { db } from "@/lib/db";

export const getAllEvents = async () => {
  try {
    const events = await db.event.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return events;
  } catch (error) {
    return error;
  }
};
