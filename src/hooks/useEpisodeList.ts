import { useQuery } from "@tanstack/react-query";
import { getEpisodeList } from "../services/episode";

export const useEpisodeList = (token: string, seasonId: string) => {
  return useQuery({
    queryKey: ["episodes", seasonId],
    queryFn: () => getEpisodeList(token, seasonId),
    enabled: !!token && !!seasonId,
  });
};