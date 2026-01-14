import z from 'zod';

const reviewsSchema = z.object({
    username: z.string().min(1, "შეიყვანეთ სახელი!"),
    email: z.email('იმეილი არასწორია, გთხოვ სწორად შეიყვანო'),
    rating: z.number(),
    description: z.string().min(1, 'შეიყვანეთ აღწერა!'),
});
export default reviewsSchema;