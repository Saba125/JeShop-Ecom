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
    .regex(/^(\+995)?5\d{8}$/, "გთხოვთ შეიყვანეთ სწორი მობილური ნომერი!"),
});
export const loginSchema = z.object({
  email: z.email("გთხოვთ შეიყვანოთ სწორი ელ.ფოსტა"),
  password: z
    .string()
    .min(8, "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს")
    .max(20, "პაროლი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს"),
  ip_address: z.string().regex(/^(?:\d{1,3}\.){3}\d{1,3}$/, "გთხოვთ შეიყვანოთ სწორი IP მისამართი"),
});
export const categorySchema = z.object({
  uid: z.number().optional(),
  name: z
    .string()
    .min(3, "სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს")
    .max(50, "სახელი უნდა შეიცავდეს მაქსიმუმ 50 სიმბოლოს"),
  url: z
    .string()
    .min(3, "მისამართი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს")
    .max(50, "მისამართი უნდა შეიცავდეს მაქსიმუმ 50 სიმბოლოს"),
  description: z.string().max(255, "აღწერა უნდა შეიცავდეს მაქსიმუმ 255 სიმბოლოს").optional(),
});
export const productSchema = z.object({
  uid: z.string().optional(),
  name: z
    .string()
    .min(3, "სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს")
    .max(50, "სახელი უნდა შეიცავდეს მაქსიმუმ 50 სიმბოლოს"),
  description: z.string().optional(),
  stock: z.string().optional(),
  category_uid: z.string().nullable().optional(),
  weight: z.string(),
  price: z.string(),
  unit_uid: z.string().min(1, "აირჩიეთ განზომილება"),
  brand_uid: z.string().min(1, "აირჩიეთ ბრენდი"),
});
export const saleSchema = z
  .object({
    user_uid: z.string().min(1, "აირჩიეთ მომხარებელი!"),
    product_uid: z.string().min(1, "აირჩიეთ პროდუქტი!"),
    type: z.string().min(1, "აირჩიეთ ტიპი!"),
    amount: z.string().min(1, "შეიყვანეთ რაოდენობა"),
    description: z.string().max(255, "აღწერა უნდა იყოს მაქსიმუმ 255 ასო!").optional(),
    code: z.string().min(1, "შეიყვანეთ კოდი!").max(50, "კოდი უნდა იყოს მაქსიმუმ 50 ასო!"),
    is_active: z.number().min(1, "აირჩიეთ სტატუსი"),
  })
  .array();
export const unitSchema = z.object({
  uid: z.string().optional(),
  name: z
    .string()
    .min(1, "სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს")
    .max(20, "სახელი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს"),
  description: z.string().optional(),
});
export const brandSchema = z.object({
  uid: z.string().optional(),
  name: z
    .string()
    .min(1, "სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს")
    .max(20, "სახელი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს"),
  description: z.string().optional(),
  image: z.string().optional(),
});
export const userEditSchema = z.object({
  uid: z.number(),
  username: z
    .string()
    .min(1, "სახელი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს")
    .max(20, "სახელი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს"),
  email: z.email("იმეილი არასწორია, გთხოვ სწორად შეიყვანო"),
  phone: z
    .string()
    .min(9, "ნომერი უნდა შეიცავდეს მინიმუმ 9 სიმბოლოს")
    .max(20, "ნომერი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს"),
  user_type: z.string().min(1, "აირჩიეთ ტიპი"),
  status: z.string().min(1, "აირჩიეთ სტატუსი!"),
});
export const validateSchema = <T>(schema: z.ZodSchema<T>, data: any) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    // Return just the first error message
    return {
      success: false as const,
      error: result.error.issues[0].message,
    };
  }
  return {
    success: true as const,
    data: result.data,
  };
};
