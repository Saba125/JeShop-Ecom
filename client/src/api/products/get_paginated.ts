import { useQuery } from '@tanstack/react-query';
import Api from '@/api/axios';
import type { TGetProductsPaginated } from '@/types';
import { queryKeys } from '@/constants/query_keys';

export const useGetProductsPaginated = (page: number, pageSize: number) => {
    return useQuery<TGetProductsPaginated>({
        queryKey: [queryKeys.products.all, page, pageSize],
        queryFn: async () => {
            const { data } = await Api.get(`/products/paginated?page=${page}&pageSize=${pageSize}`);
            return data as TGetProductsPaginated;
        },
    });
};
