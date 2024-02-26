"use server";
import { db } from "@/lib/db";

export const contactUs = async ({
  first_name,
  last_name,
  email,
  phone_number,
  message,
}: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
}) => {
  try {
    const data = await db.contacuUs.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        message,
      },
    });
    return { message: "We will reach you soon!", status: 200, data };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong!", status: 500 };
  }
};

export const getContactUs = async () => {
  try {
    const data = await db.contacuUs.findMany({});
    return { status: 200, data };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong!", status: 500 };
  }
};
