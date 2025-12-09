import { useQuery } from '@tanstack/react-query';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
import type { TGetSalesPaginated } from '@/types';

export const useGetSalesPaginated = (page: number, pageSize: number) => {
    return useQuery<TGetSalesPaginated>({
        queryKey: [queryKeys.sales.all, page, pageSize],
        queryFn: async () => {
            const { data } = await Api.get(`/sales/paginated?page=${page}&pageSize=${pageSize}`);
            return data as TGetSalesPaginated;
        },
    });
};
