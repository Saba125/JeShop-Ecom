import { useQuery } from "@tanstack/react-query";
import Api from "@/api/axios";
import type { Category } from "@/types";
import { queryKeys } from "@/constants/query_keys";

export const useGetCategories = () => {
  return useQuery<Category[]>({
    queryKey: queryKeys.categories.all,
    queryFn: async () => {
      const { data } = await Api.get("/category");
      return data as Category[]; // ✅ Explicitly tell TypeScript it’s an array
    },
  });
};
