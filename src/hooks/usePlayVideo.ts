import { useQuery } from "@tanstack/react-query";
import { getPlayData } from "../services/play";

type PlayParams = {
  entryid?: string; //? entry id optional
};

export const usePlayVideo = (token: string, params: PlayParams) => {
  const key = params.entryid ?? "";

  return useQuery({
    queryKey: ["play", key],
    queryFn: () => getPlayData(token, params),
    enabled: !!token && !!key,
  });
};
