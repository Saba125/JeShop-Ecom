import { useQuery } from '@tanstack/react-query';
import Api from '@/api/axios';
import type { TGetPaginatedUsers } from '@/types';
import { queryKeys } from '@/constants/query_keys';

export const useGetUsersPaginated = (page: number, pageSize: number) => {
    return useQuery<TGetPaginatedUsers>({   
        queryKey: [...queryKeys.usersPaginated.all, page, pageSize], // ← important
        queryFn: async () => {
            const { data } = await Api.get(
                `/users/all/paginated?page=${page}&pageSize=${pageSize}`
            );
            return data as TGetPaginatedUsers;
        },
    });
};
