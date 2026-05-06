import { z } from 'zod';
const formSchema = z.object({
     password: z
        .string()
        .min(1, 'პაროლი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს')
        .max(20, 'პაროლი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს'),
    newPassword: z
        .string()
        .min(1, 'ახალი პაროლი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს')
        .max(20, 'ახალი პაროლი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს'),
    repeatPassword: z
        .string()
        .min(1, 'პაროლი უნდა შეიცავდეს მინიმუმ 1 სიმბოლოს')
        .max(20, 'პაროლი უნდა შეიცავდეს მაქსიმუმ 20 სიმბოლოს'),

});
export default formSchema;
