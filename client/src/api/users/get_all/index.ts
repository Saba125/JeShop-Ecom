import { useQuery } from '@tanstack/react-query';
import Api from '@/api/axios';
import { queryKeys } from '@/constants/query_keys';
import type { User } from '@/types';

export const useGetUsers = () => {
    return useQuery<User[]>({
        queryKey: queryKeys.users.all,
        queryFn: async () => {
            const { data } = await Api.post('/users');
            return data as User[];
        },
    });
};
