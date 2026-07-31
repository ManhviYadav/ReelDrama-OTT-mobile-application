import { API } from "../constants/api";

export const logout = async (uuid: string) => {
  const response = await fetch(`${API.BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uuid,
    }),
  });

  return await response.json();
};