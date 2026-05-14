import { useQuery } from '@tanstack/react-query';
import Api from '@/api/axios';
import type { TGetProductsPaginated } from '@/types';
import { queryKeys } from '@/constants/query_keys';

export const useGetProductsPaginated = (pagination: {pageSize: number, page:number}, options?: any) => {
    return useQuery<TGetProductsPaginated>({
        queryKey: [queryKeys.products.all, pagination.page, pagination.pageSize],
        queryFn: async () => {
            const { data } = await Api.get(`/products/paginated?page=${pagination.page}&pageSize=${pagination.pageSize}`);
            return data as TGetProductsPaginated;
        },
        ...options
    });
};
