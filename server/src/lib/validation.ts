/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
  phone: z.string().regex(/^(\+995)?5\d{8}$/, "Invalid Georgian phone number"),
});
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
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
