import { useQuery } from "@tanstack/react-query";
import Api from "@/api/axios";
import type { TGetProducts } from "@/types";
import { queryKeys } from "@/constants/query_keys";

export const useGetProducts = (filter: any,options?: any) => {
    console.log(options)
  return useQuery<TGetProducts[]>({
    queryKey: queryKeys.products.all,
    queryFn: async () => {
      const { data } = await Api.post("/products/all");
      return data as TGetProducts[]; 
    },
    ...options
  });
};
