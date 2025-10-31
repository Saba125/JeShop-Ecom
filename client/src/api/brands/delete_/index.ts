import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
export const useDeleteBrand = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (uid:number) => {
            const response = await Api.delete(`brand/${uid}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`ბრენდი წარმატებით წაიშალა!`);
            queryClient.invalidateQueries({ queryKey: queryKeys.brands.all });
        },
    });
    return mutation;
};
