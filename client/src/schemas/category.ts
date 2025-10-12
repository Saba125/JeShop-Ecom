import { z } from 'zod';
const formSchema = z.object({
    image: z.string().optional(),
    name: z.string().min(3, 'სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს').max(50, 'სახელი უნდა შეიცავდეს მაქსიმუმ 50 სიმბოლოს'),
    description: z.string().optional(),
});
export default formSchema;
