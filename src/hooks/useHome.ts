import { useQuery } from "@tanstack/react-query";
import { getHome } from "../services/home";

export const useHome = (token: string, slug: string) => {
  return useQuery({
    queryKey: ["home", slug],
    queryFn: () => getHome(token, slug),
    enabled: !!token && !!slug,
    refetchOnMount: "always",
  });
};