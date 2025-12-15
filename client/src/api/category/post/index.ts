import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
export const useAddCategory = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await Api.post('category', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`კატეგორია წარმატებით დაემატა!`);
            queryClient.invalidateQueries({queryKey: queryKeys.categories.all})
        },
    });
    return mutation;
};
