import { useQuery } from "@tanstack/react-query";
import Api from "@/api/axios";
import type { TGetProducts } from "@/types";
import { queryKeys } from "@/constants/query_keys";

export const useGetSingleProduct = (uid: number) => {
  return useQuery<TGetProducts>({
    queryKey: queryKeys.products.details(uid),
    queryFn: async () => {
      const { data } = await Api.get(`/product/${uid}`);
      return data as TGetProducts; 
    },
  });
};
