import { useQuery } from "@tanstack/react-query";
import Api from "@/api/axios";
import type { TGetProducts } from "@/types";
import { queryKeys } from "@/constants/query_keys";

export const useGetSimilarProducts = (uid: number) => {
  return useQuery<TGetProducts[]>({
    queryKey: queryKeys.products.similar(uid),
    queryFn: async () => {
      const { data } = await Api.post(`/products/similar/${uid}`);
      return data as TGetProducts[]; 
    },
  });
};
