import { useQuery } from "@tanstack/react-query";
import Api from "@/api/axios";
import type { TGetReviews } from "@/types";
import { queryKeys } from "@/constants/query_keys";

export const useGetReviews = (product_uid: number) => {
  return useQuery<TGetReviews[]>({
    queryKey: queryKeys.reviews.all,
    queryFn: async () => {
      const { data } = await Api.get(`/reviews/${product_uid}`);
      return data as TGetReviews[]; 
    },
  });
};
