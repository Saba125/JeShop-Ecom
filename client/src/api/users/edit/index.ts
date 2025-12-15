import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
import formSchema from '@/schemas/user';
import type z from 'zod';
export const useEditUser = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const response = await Api.put('user', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`იუზერი წარმატებით რედაქტირდა!`);
            queryClient.invalidateQueries({ queryKey: queryKeys.usersPaginated.all });
        },
    });
    return mutation;
};
