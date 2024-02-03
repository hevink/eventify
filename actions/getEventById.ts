"use server";

import { db } from "@/lib/db";

export const getEventById = async (id: string) => {
  const event = await db.event.findUnique({
    where: {
      id,
    },
  });
  return event;
};
