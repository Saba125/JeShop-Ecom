import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
export const useEditProduct = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await Api.put('product', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`პროდუქტი წარმატებით რედაქტირდა!`);
            queryClient.invalidateQueries({queryKey: queryKeys.products.all});
        },
    });
    return mutation;
};
