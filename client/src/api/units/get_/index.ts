import { useQuery } from "@tanstack/react-query";
import Api from "@/api/axios";
import type {  TGetUnit } from "@/types";
import { queryKeys } from "@/constants/query_keys";

export const useGetUnits = () => {
  return useQuery<TGetUnit[]>({
    queryKey: queryKeys.units.all,
    queryFn: async () => {
      const { data } = await Api.post("/units/all");
      return data as TGetUnit[]; 
    },
  });
};
