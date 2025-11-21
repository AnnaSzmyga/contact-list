import { useInfiniteQuery } from "@tanstack/react-query";
import apiData from "../api/api";

export const useApiInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["data"],
    queryFn: async () => {
      return apiData();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return pages.length;
    },
  });
};
