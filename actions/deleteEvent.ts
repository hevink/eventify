"use server";
import { db } from "@/lib/db";

export const deleteEvent = async (id: string) => {
  try {
    const data = await db.event.delete({
      where: {
        id,
      },
    });
    return { message: "Event deleted successfully", status: 200, data };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong!", status: 500 };
  }
};
