import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import registerSchema from '@/schemas/register';
import Api from '@/api/axios';
export const useRegister = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof registerSchema>) => {
            const response = await Api.post('register', data);
            return response.data;
        },
        onSuccess: () => {
            navigate('/auth/login');
            toast.success(`წარმატებით დარეგისტრირდით. გთხოვთ გაიარეთ ავტორიზაცია!`);
        },
        onError: () => {
            toast.error('მონაცემები არასწორია. გთხოვთ სცადეთ მოგვიანებით.');
        },
    });
    return mutation;
};
