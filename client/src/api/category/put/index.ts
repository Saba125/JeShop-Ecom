import { useMutation, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
export const useEditCategory = (uid: number) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await Api.put(`category/${uid}`, data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`კატეგორია წარმატებით რედაქტირდა!`);
            queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
        },
    });
    return mutation;
};
