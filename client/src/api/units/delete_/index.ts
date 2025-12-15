import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
export const useDeleteUnit = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (uid: number) => {
            const response = await Api.delete(`unit/${uid}`);
        },
        onSuccess: () => {
            toast.success(`ერთეული წარმატებით წაიშალა!`);
            queryClient.invalidateQueries({queryKey: queryKeys.units.all});
        },
    });
    return mutation;
};
