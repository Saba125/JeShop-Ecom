import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
export const useAddCategory = () => {
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await Api.post('category', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`კატეგორია წარმატებით დაემატა!`);
        },
       
    });
    return mutation;
};
