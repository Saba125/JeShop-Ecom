import { z } from 'zod';
const formSchema = z.object({
    username: z.string().min(3, 'სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს'),
    email: z.email('გთხოვთ შეიყვანოთ სწორი ელ.ფოსტა'),
    password: z.string().min(8, 'პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს'),
    phone: z.string()
    .min(1, "მობილური ნომერი აუცილებელია!")
    .regex(
      /^(\+995)?5\d{8}$/,
      "Phone number must be a valid Georgian number"
    ),

});
export default formSchema;
