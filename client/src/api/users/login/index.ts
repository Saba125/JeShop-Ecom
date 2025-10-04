import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import loginSchema from '@/schemas/login';
import Api from '@/api/axios';
import { setUser } from '@/store/userSlice';
export const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof loginSchema>) => {
            const response = await Api.post('login', data);
            return response.data;
        },
        onSuccess: (data) => {
            const { accessToken, user } = data;
            navigate('/');
            localStorage.setItem('accessToken', accessToken);
            dispatch(setUser(user));
            toast.success(`Welcome back, ${user.username}!`);
        },
        onError: () => {
            toast.error('Login failed. Please check your credentials and try again.');
        },
    });
    return mutation;
};
