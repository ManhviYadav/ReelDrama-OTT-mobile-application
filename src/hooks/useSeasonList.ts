import { useQuery } from "@tanstack/react-query";
import { getSeasonList } from "../services/season";

export const useSeasonList = (token: string, categoryId: string) => {
  return useQuery({
    queryKey: ["seasons", categoryId], //cache memory dubara same series than no api call use cache memory
    queryFn: () => getSeasonList(token, categoryId), //api call
    enabled: !!token && !!categoryId,
  });
};

