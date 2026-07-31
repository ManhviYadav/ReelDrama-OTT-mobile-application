import axiosInstance from "./axios";

export const getHome = async (token: string) => {
  const response = await axiosInstance.get("/home", {
    params: {
      page: 0,
      slug: "home",
      application_type: "w",
    },
    headers: {
      token,
    },
  });

  return response.data;
};