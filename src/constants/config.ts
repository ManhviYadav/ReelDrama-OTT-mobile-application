import { Platform } from "react-native";

export const CONFIG = {
  PARTNER_ID: process.env.EXPO_PUBLIC_PARTNER_ID ?? "",
  DEVICE_TYPE: process.env.EXPO_PUBLIC_DEVICE_TYPE ?? "",
  OS_TYPE: Platform.OS,
  BROWSER_TYPE: process.env.EXPO_PUBLIC_BROWSER_TYPE ?? "",
  VERSION: process.env.EXPO_PUBLIC_APP_VERSION ?? "",
};