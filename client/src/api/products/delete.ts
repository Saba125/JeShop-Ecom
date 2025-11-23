import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (uid: number) => {
            const response = await Api.delete(`product/${uid}`);
            return response;
        },
        onSuccess: () => {
            toast.success(`პროდუქტი წარმატებით წაიშალა!`);
            queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
        },
    });
    return mutation;
};
