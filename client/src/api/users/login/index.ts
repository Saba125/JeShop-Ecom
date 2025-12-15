import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import loginSchema from '@/schemas/login';
import Api from '@/api/axios';
import { setUser } from '@/store/userSlice';
import { REFRESH_TOKEN, AUTH_TOKEN } from '@/constants';
export const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof loginSchema>) => {
            const response = await Api.post('login', data);
            return response.data;
        },
        onSuccess: (data) => {
            const { accessToken, refreshToken, user } = data;
            navigate(user.user_type === 1 ? "/admin" : "/");
            localStorage.setItem(AUTH_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            dispatch(setUser(user));
            toast.success(`Welcome back, ${user.username}!`);
        },
        onError: () => {
            toast.error('მონაცემები არასწორია. გთხოვთ სცადეთ მოგვიანებით.');
        },
    });
    return mutation;
};
