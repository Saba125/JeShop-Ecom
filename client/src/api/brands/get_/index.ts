import { useQuery } from "@tanstack/react-query";
import Api from "@/api/axios";
import type {  TGetBrand } from "@/types";
import { queryKeys } from "@/constants/query_keys";

export const useGetBrands = () => {
  return useQuery<TGetBrand[]>({
    queryKey: queryKeys.brands.all,
    queryFn: async () => {
      const { data } = await Api.post("/brands/all");
      return data as TGetBrand[];
    },
  });
};
