import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
export const useDeleteSale = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (uid:number) => {
            const response = await Api.delete(`sale/${uid}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`ფასდაკლება წარმატებით წაიშალა!`);
            queryClient.invalidateQueries({ queryKey: queryKeys.sales.all });
        },
    });
    return mutation;
};
