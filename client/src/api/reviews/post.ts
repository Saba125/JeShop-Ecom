import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
import formSchema from '@/schemas/reviews';
import type z from 'zod';
export const useAddReviews = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const response = await Api.post('review', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`მიმოხილვა წარმატებით დაემატა!`);
            queryClient.invalidateQueries({queryKey: queryKeys.reviews.all});
        },
    });
    return mutation;
};
