"use server";

import { db } from "@/lib/db";

export const getLatestEvent = async () => {
  const event = await db.event.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
  return [event];
};
