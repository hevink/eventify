"use server";

import { db } from "@/lib/db";

export const getAllEvents = async (slug?: string) => {
  console.log(slug);
  
  try {
    const events = await db.event.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        eventName: {
          contains: slug,
        },
      },
    });
    return events;
  } catch (error) {
    return error;
  }
};
