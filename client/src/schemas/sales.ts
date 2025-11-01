import { z } from 'zod';
const formSchema = z.object({
    user_uid: z.string().min(1, "აირჩიეთ მომხარებელი!"),
    product_uid: z.string().min(1, "აირჩიეთ პროდუქტი!"),
    type: z.number().min(1, "აირჩიეთ ტიპი!"),
    description: z.string().max(255, "აღწერა უნდა იყოს მაქსიმუმ 255 ასო!").optional(),
    code: z.string().min(1, "შეიყვანეთ კოდი!").max(50, "კოდი უნდა იყოს მაქსიმუმ 50 ასო!"),
    is_active: z.number().min(1, "აირჩიეთ სტატუსი"),
});
export default formSchema;
