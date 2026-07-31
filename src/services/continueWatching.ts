import axiosInstance from "@/constants/axios";

export const postContinueWatching = async (
  token: string,
  entryId: string,
  durationMs: number
) => {
  const response = await axiosInstance.post(
    "/continue-watching",
    {
      entry_id: entryId,
      duration: durationMs,
    },
    {
      headers: { token },
    }
  );

  return response.data;
};