import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
import type z from 'zod';
import formSchema from '@/schemas/sales';
import type { SaleItems } from '@/types';
export const useAddSale = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data: SaleItems[]) => {
            const response = await Api.post('sale', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success(`ფასდაკლება წარმატებით დაემატა!`);
            queryClient.invalidateQueries({queryKey: queryKeys.sales.all});
        },
    });
    return mutation;
};
