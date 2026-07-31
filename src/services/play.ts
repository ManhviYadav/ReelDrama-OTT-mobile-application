import axiosInstance from "@/constants/axios";

export type PlayParams = {
  entryid?: string;
};

export const getPlayData = async (token: string, params: PlayParams) => {
  const response = await axiosInstance.get("/video-data", {
    params: {
      entry_id: params.entryid,
      _t: Date.now(), // to avoid cache , response fresh
    },
    headers: { token },
  });

  return response.data;
};