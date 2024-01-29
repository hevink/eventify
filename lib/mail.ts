import nodemailer from "nodemailer";
import { Email } from "./email";
import { render } from "@react-email/render";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "",
      html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const send2FAEmail = async (email: string, token: string) => {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "",
      html: `<p>Your 2FA code: ${token}</p>`,
    });
  } catch (error) {
    console.error("2FA Mail Eroor", error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const link = `${domain}/auth/new-verification?token=${token}`;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const emailHtml = render(Email({ link }));

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "",
      html: emailHtml,
    });
  } catch (error) {
    console.log(error);
  }
};
