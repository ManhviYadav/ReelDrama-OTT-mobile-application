import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../services/menu";

export const useMenu = (token: string) => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: () => getMenu(token),
    enabled: !!token,
  });
};