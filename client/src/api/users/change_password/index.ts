import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
import formSchema from '@/schemas/change_password';
import type z from 'zod';
export const useChangePassword = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const response = await Api.post('user/change_password', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`პაროლი წარმატებით რედაქტირდა!`);
            queryClient.invalidateQueries({ queryKey: queryKeys.usersPaginated.all });
        },
    });
    return mutation;
};
