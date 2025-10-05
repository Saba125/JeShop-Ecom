import { z } from 'zod';
const formSchema = z.object({
    email: z.email('გთხოვთ შეიყვანოთ სწორი ელ.ფოსტა'),
    password: z.string().min(8, 'პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს'),
    ip_address: z
        .string()
        .regex(/^(?:\d{1,3}\.){3}\d{1,3}$/, 'გთხოვთ შეიყვანოთ სწორი IP მისამართი').optional()
});
export default formSchema;
