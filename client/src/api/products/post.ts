import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import type { TAddProduct } from '@/types';
import { queryKeys } from '@/constants/query_keys';
export const useAddProduct = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: TAddProduct) => {
            const response = await Api.post('product', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`პროდუქტი წარმატებით დაემატა!`);
            queryClient.invalidateQueries({queryKey: queryKeys.products.all});
        },
    });
    return mutation;
};
