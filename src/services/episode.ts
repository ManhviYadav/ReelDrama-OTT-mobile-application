import axiosInstance from "@/constants/axios";

//backend ko req
export const getEpisodeList = async (
  token: string,
  seasonId: string,
  page = 0,
  limit = 25
) => {

  //api call
  const response = await axiosInstance.get("/episode-list", {
    params: { season_id: seasonId, page, limit },
    headers: { token },
  });

  return response.data;
};