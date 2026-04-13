import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
import type { Review } from '@/types';
import type z from 'zod';
export const useEditReview = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: z.infer<Review>) => {
            const response = await Api.put('review', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`მიმოხილვა წარმატებით დარედაქტირდა!`);
            queryClient.invalidateQueries({queryKey: queryKeys.reviews.all});
        },
    });
    return mutation;
};
