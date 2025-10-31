import z from "zod";

const brandSchema = z.object({
    uid: z.string().optional(),
    name: z.string().min(1, "სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს").max(20, "სახელი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს"),
    description: z.string().optional(),
    image: z.string().optional()
});
export default brandSchema;