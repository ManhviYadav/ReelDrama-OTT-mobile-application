import axiosInstance from "@/constants/axios";

export const getSeasonList = async (token: string, categoryId: string) => {
  const response = await axiosInstance.get("/season-list", {
    params: { category_id: categoryId }, // tell backend which series
    headers: { token }, //JWT token for authentication
  });

  return response.data; // response ko hook ke paas jayega
};

//getSeasonList()- Ye backend call karta hai.
//axiosInstance.get()- GET api call
//"/season-list"- endpoint (base URL+ endpoint)