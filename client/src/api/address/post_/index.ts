import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
export const useAddAddress = () => {
    const mutation = useMutation({
        mutationFn: async (data: {address_text: string; address_lng: number; address_lat:number;}) => {
            const response = await Api.post('address', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`მისამართი წარმატებით დაემატა!`);
        },
    });
    return mutation;
};
