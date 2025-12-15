import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
import formSchema from '@/schemas/unit';
import type z from 'zod';
export const useEditUnit = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const response = await Api.put('unit', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`ერთეული წარმატებით რედაქტირდა!`);
            queryClient.invalidateQueries({queryKey: queryKeys.units.all});
        },
    });
    return mutation;
};
