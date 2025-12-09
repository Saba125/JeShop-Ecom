import { useQuery } from '@tanstack/react-query';
import Api from '@/api/axios';
import type { TGetCategoriesPaginated, TGetProductsPaginated } from '@/types';
import { queryKeys } from '@/constants/query_keys';

export const useGetCategoriesPaginated = (page: number, pageSize: number) => {
    return useQuery<TGetCategoriesPaginated>({
        queryKey: [queryKeys.products.all, page, pageSize],
        queryFn: async () => {
            const { data } = await Api.get(`/category/paginated?page=${page}&pageSize=${pageSize}`);
            return data as TGetCategoriesPaginated;
        },
    });
};
