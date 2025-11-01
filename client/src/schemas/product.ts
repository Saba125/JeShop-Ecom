import { z } from 'zod';
const formSchema = z.object({
    uid: z.number().optional(),
    image: z.string().optional(),
    name: z.string().min(3, 'სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს').max(50, 'სახელი უნდა შეიცავდეს მაქსიმუმ 50 სიმბოლოს'),
    description: z.string().optional(),
    stock: z.string().optional(),
    category_uid: z.string().nullable().optional(),
    weight: z.string(),
    price: z.string(),
    unit_uid: z.string().min(1, 'აირჩიეთ განზომილება'),
    brand_uid: z.string().min(1, 'აირჩიეთ ბრენდი').nullable()

});
export default formSchema;
