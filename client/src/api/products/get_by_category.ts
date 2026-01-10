import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import Api from "@/api/axios";
import type { TGetProducts } from "@/types";
import { queryKeys } from "@/constants/query_keys";
import type { FiltersContext } from "@/pages/(store)/category";

// Deep comparison for objects
const deepEqual = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// Custom hook for debouncing with deep comparison
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const previousValue = useRef<T>(value);

  useEffect(() => {
    // Only set timeout if value actually changed
    if (!deepEqual(value, previousValue.current)) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        previousValue.current = value;
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, delay]);

  return debouncedValue;
};

export const useGetProductsByCategory = (
  name: string,
  filter?: FiltersContext,
  debounceDelay: number = 500 // 500ms default delay
) => {
  // Debounce the entire filter object with deep comparison
  const debouncedFilter = useDebounce(filter, debounceDelay);

  return useQuery<TGetProducts[]>({
    queryKey: [
      queryKeys.products.byCategory,
      name,
      // Stringify for stable key comparison
      JSON.stringify(debouncedFilter),
    ],
    queryFn: async () => {
      const { data } = await Api.post(`/products/category/${name}`, {
        filter: debouncedFilter,
      });
      return data as TGetProducts[];
    },
    // Keep previous data while loading new results
    placeholderData: (previousData) => previousData,
  });
};