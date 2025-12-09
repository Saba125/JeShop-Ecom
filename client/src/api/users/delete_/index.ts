import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (uid: number) => {
            const response = await Api.delete(`user/${uid}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`იუზერი წაიშალა!`);
            queryClient.invalidateQueries({ queryKey: queryKeys.usersPaginated.all });
        },
    });
    return mutation;
};
