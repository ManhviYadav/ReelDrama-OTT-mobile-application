import axiosInstance from "@/constants/axios";

export const getHome = async (token: string, slug: string) => {
  const response = await axiosInstance.get("/home", {
    params: {
      page: 0,
      slug,
      application_type: "a",
    },
    headers: { token },
  });

  return response.data;
};