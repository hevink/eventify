import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string(),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  name: z.string().min(1, {
    message: "Please enter your name",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const eventSchema = z.object({
  eventName: z.string().min(1, { message: "Event name is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  // isFree: z.boolean(),
  organizer: z.string().min(1, { message: "Organizer is required" }),
  eventStartDate: z.date(),
  eventEndDate: z.date(),
  time: z.string().min(1, { message: "Time is required" }),
  venue: z.string().min(1, { message: "Venue is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  pin: z.string().min(1, { message: "Pincode is required" }),
  capacity: z.string().min(1, { message: "Capacity is required" }),
  categories: z.string().min(1, { message: "Categories is required" }),
  speakers: z.string().min(1, { message: "Speakers is required" }),
  tags: z.string().min(1, { message: "Tags is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description should not exceed 500 characters" }),
});

export const contactFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  message: z.string(),
});
