import { useQuery } from "@tanstack/react-query";
import Api from "@/api/axios";
import type { TGetProducts } from "@/types";
import { queryKeys } from "@/constants/query_keys";

export const useGetProductsByCategory = (name: string) => {
  return useQuery<TGetProducts[]>({
    queryKey: queryKeys.products.all,
    queryFn: async () => {
      const { data } = await Api.post(`/products/category/${name}`);
      return data as TGetProducts[]; 
    },
  });
};
