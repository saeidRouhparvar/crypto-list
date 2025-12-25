import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { listService } from "@/src/services/query/mainListService";
import { MainListResponse } from "@/src/app/utils/type";

export const useGetMainList = (params?: Record<string, string | number | boolean>): UseQueryResult<MainListResponse> =>
  useQuery<MainListResponse>({
    queryKey: ["main-list", params],
    queryFn: () => listService(params),
    staleTime: 30_000,
  });
