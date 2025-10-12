/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს")
    .max(20, "სახელი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს"),
  email: z.string().email("გთხოვთ შეიყვანოთ სწორი ელ.ფოსტა"),
  password: z
    .string()
    .min(8, "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს")
    .max(20, "პაროლი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს"),
  phone: z
    .string()
    .min(1, "მობილური აუცილებელია")
    .regex(
      /^(\+995)?5\d{8}$/,
      "გთხოვთ შეიყვანეთ სწორი მობილური ნომერი!"
    ),
});
export const loginSchema = z.object({
  email: z.email("გთხოვთ შეიყვანოთ სწორი ელ.ფოსტა"),
  password: z
    .string()
    .min(8, "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს")
    .max(20, "პაროლი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს"),
    ip_address: z
        .string()
        .regex(/^(?:\d{1,3}\.){3}\d{1,3}$/, "გთხოვთ შეიყვანოთ სწორი IP მისამართი"),
});
export const categorySchema = z.object({
  uid: z.number().optional(),
  name: z.string().min(3, "სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს").max(50, "სახელი უნდა შეიცავდეს მაქსიმუმ 50 სიმბოლოს"),
  description: z.string().max(255, "აღწერა უნდა შეიცავდეს მაქსიმუმ 255 სიმბოლოს").optional(),
});
export const validateSchema = <T>(schema: z.ZodSchema<T>, data: any) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    // Return just the first error message
    return {
      success: false as const,
      error: result.error.issues[0].message
    };
  }

  return {
    success: true as const,
    data: result.data
  };
};
