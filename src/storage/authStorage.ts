import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN = "TOKEN";

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
};

export const getToken = async () => {
  return AsyncStorage.getItem(TOKEN);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN);
};