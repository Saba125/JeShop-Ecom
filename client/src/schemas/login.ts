import { z } from 'zod';
const formSchema = z.object({
    email: z.email('გთხოვთ შეიყვანოთ სწორი ელ.ფოსტა'),
    password: z.string().min(8, 'პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს'),

});
export default formSchema;
