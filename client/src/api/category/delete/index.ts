import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (uid:number) => {
            const response = await Api.delete(`category/${uid}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`კატეგორია წარმატებით წაიშალა!`);
            queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
        },
    });
    return mutation;
};
