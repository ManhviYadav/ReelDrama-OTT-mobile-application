import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postContinueWatching } from "../services/continueWatching";

type Params = {
  entryId: string;
  durationMs: number;
};

export function useUpdateContinueWatching(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ entryId, durationMs }: Params) =>
      postContinueWatching(token, entryId, durationMs),

  
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
}