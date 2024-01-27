"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { ResetSchema } from "@/schemas";
import * as z from "zod";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (value: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(value);

  if (!validatedFields.success) {
    return {
      error: "invalid email",
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(validatedFields.data.email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Reset Email Send!" };
};
