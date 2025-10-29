import { z } from 'zod';
const formSchema = z.object({
    uid: z.number().optional(),
    name: z
        .string()
        .min(1, 'სახელი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს')
        .max(20, 'სახელი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს'),
    description: z.string().optional(),
});
export default formSchema;
