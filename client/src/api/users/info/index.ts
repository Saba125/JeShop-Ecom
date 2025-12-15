import { useQuery } from '@tanstack/react-query';
import Api from '@/api/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';
import { queryKeys } from '@/constants/query_keys';

export const useCurrentUser = () => {
    const accessToken = localStorage.getItem('accessToken');
    const dispatch = useDispatch();
    const query = useQuery({
        queryKey: queryKeys.users.all,
        queryFn: async () => {
            const { data } = await Api.get('/checkUser');
            return data;
        },
        enabled: !!accessToken,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: Infinity,
        retry: false,
    });

    if (query.isSuccess) {
        dispatch(setUser(query.data));
    }

    return query;
};
