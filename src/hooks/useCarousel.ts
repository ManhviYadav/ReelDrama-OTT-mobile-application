import { useQuery } from "@tanstack/react-query";
import { getCarousel } from "../services/carousel";

export const useCarousel = (token: string, slug: string) => {
  return useQuery({
    queryKey: ["carousel", slug],
    queryFn: () => getCarousel(token, slug),
    enabled: !!token&& !!slug,
  });
};