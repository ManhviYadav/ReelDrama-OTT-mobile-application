import axiosInstance from "@/constants/axios";

export const getCarousel = async (token: string, slug: string) => {
  const response = await axiosInstance.get("/carousel", {
    params: {
      application_type: "a",
      slug,
    },
    headers: {
      token,
    },
  });

  return response.data;
};