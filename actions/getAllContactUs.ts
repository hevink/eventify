"use server";
import { db } from "@/lib/db";

export const contactUs = async () => {
  try {
    const response = await db.contacuUs.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return {
      message: "Your message has been sent successfully!",
      status: 200,
      response,
    };
  } catch (error) {
    return { message: "Something went wrong!", status: 500 };
  }
};
