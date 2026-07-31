import axiosInstance from "@/constants/axios";

export const getMenu = async (token: string) => {
  const response = await axiosInstance.get("/menu", {
    params: {
      menu_type: "h",
      application_type: "a",
    },
    headers: {
      token,
    },
  });

  return response.data;
};