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
  eventName: z.string().min(2, {
    message: "Event name must be required.",
  }),
  eventDate: z.date({
    required_error: "A date of birth is required.",
  }),
  organizer: z.string().min(1, {
    message: "Organizer name must be required.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().min(1, {
    message: "Price must be required.",
  }),
  street: z.string().min(1, {
    message: "Street must be required.",
  }),
  city: z.string().min(1, {
    message: "City must be required.",
  }),
  state: z.string().min(1, {
    message: "State must be required.",
  }),
  zip: z.string().min(1, {
    message: "Zip must be required.",
  }),
  country: z.string().min(1, {
    message: "Country must be required.",
  }),
  pin: z.string().min(1, {
    message: "Pin must be required.",
  }),
  contactName: z.string().min(1, {
    message: "Contact name must be required.",
  }),
  contactEmail: z.string().min(1, {
    message: "Contact email must be required.",
  }),
  contactPhone: z.string().min(1, {
    message: "Contact phone must be required.",
  }),
  image: z.string().min(1, {
    message: "Image must be required.",
  }),
  categories: z.string().min(1, {
    message: "Categories must be required.",
  }),
  tags: z.string(),
  capacity: z.string().min(1, {
    message: "Capacity must be required.",
  }),
  speakers: z.string().min(1, {
    message: "Speker must be required.",
  }),
});
