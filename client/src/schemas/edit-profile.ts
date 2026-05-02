import { z } from 'zod';
const formSchema = z.object({
    uid: z.number().optional(),
    username: z
        .string()
        .min(1, 'სახელი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს')
        .max(20, 'სახელი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს'),
    email: z.email('იმეილი არასწორია, გთხოვ სწორად შეიყვანო'),
    phone: z
        .string()
        .min(9, 'ნომერი უნდა შეიცავდეს მინიმუმ 9 სიმბოლოს')
        .max(20, 'ნომერი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს'),
    image: z.string().optional() 
});
export default formSchema;
