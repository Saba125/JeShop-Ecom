import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Api from '@/api/axios';
import { clearUser } from '@/store/userSlice';
export const useLogOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn: async () => {
            const response = await Api.post('logout');
            return response.data;
        },
        onSuccess: () => {
            dispatch(clearUser());
            navigate('/auth/login');
            localStorage.removeItem('accessToken');
            toast.success(`შესრულებულია!`);
        },
        onError: () => {
            toast.error('გთხოვთ სცადეთ მოგვიანებით.');
        },
    });
    return mutation;
};
