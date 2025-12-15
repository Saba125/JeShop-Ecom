import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
export const useAddBrand = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await Api.post('brand', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`ბრენდი წარმატებით დაემატა!`);
            queryClient.invalidateQueries({queryKey: queryKeys.brands.all});
        },
    });
    return mutation;
};
