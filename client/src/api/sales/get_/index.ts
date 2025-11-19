import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query_keys";
import { type TGetSales } from "@/types";
import Api from "@/auth/Api";
export const useGetSales = () => {
  return useQuery({
    queryKey: queryKeys.brands.all,
    queryFn: async () => {
      const data = await Api.post("/sales/all");
      return data as TGetSales[]
    },
  });
};
