import { useQuery } from '@tanstack/react-query';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
import type { TGetBrandsPaginated } from '@/types';

export const useGetBrandsPaginated = (page: number, pageSize: number) => {
    return useQuery<TGetBrandsPaginated>({
        queryKey: [queryKeys.products.all, page, pageSize],
        queryFn: async () => {
            const { data } = await Api.get(`/brands/paginated?page=${page}&pageSize=${pageSize}`);
            return data as TGetBrandsPaginated;
        },
    });
};
