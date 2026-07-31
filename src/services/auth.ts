import axios from "axios";
import { Platform } from "react-native";

import { API } from "../constants/api";
import { CONFIG } from "../constants/config";

/*Extract token from API response*/
const extractToken = (data: any): string => {
  return (
    data?.data?.token ||
    data?.token ||
    data?.access_token ||
    ""
  );
};


const getDeviceInfo = () => {
  return {
    device_name:
      Platform.OS === "android"
        ? "Android Device"
        : "iPhone",

    device_type: Platform.OS,

    os:
      Platform.OS === "android"
        ? "Android"
        : "iOS",

    uuid: "android-device",

    version: CONFIG.VERSION,
  };
};


export const getAnonymousToken = async () => {
  try {
    const response = await axios.get(
      `${API.BASE_URL}/gettoken`,
      {
        params: {
          partner_id: CONFIG.PARTNER_ID,
          device_type: CONFIG.DEVICE_TYPE,
          os_type: CONFIG.OS_TYPE,
          browser_type: CONFIG.BROWSER_TYPE,
          version: CONFIG.VERSION,
        },
      }
    );

    console.log(
      "Raw gettoken response:",
      response.data
    );
//just extract token from json file
    return extractToken(response.data);
  } catch (error) {
    console.log(
      "Get Token Error:",
      error
    );
    throw error;
  }
};


export const sendOtp = async (
  mobile: string,
  anonymousToken: string
) => {
  try {
    const deviceInfo = getDeviceInfo();
//post create data
    const response = await axios.post(
      `${API.BASE_URL}/signup-login`,
      {
        account_type: "mobile",
        country: "IN",

        mobile: `91${mobile}`,

        tag: "generate",

        ...deviceInfo,
      },
      {
        headers: {
          token: anonymousToken,
        },
      }
    );

    console.log(
      "Send OTP Response:",
      response.data
    );

    return response.data;
  } catch (error: any) {
    console.log(
      "Send OTP Error:",
      error?.response?.data ||
        error
    );

    throw error;
  }
};


export const verifyOtp = async (
  mobile: string,
  otp: string,
  anonymousToken: string
) => {
  try {
    const deviceInfo = getDeviceInfo();

    const response = await axios.post(
      `${API.BASE_URL}/signup-login`,
      {
        account_type: "mobile",
        country: "IN",

        mobile: `91${mobile}`,

        otp,

        tag: "verify",

        ...deviceInfo,
      },
      {
        headers: {
          token: anonymousToken,
        },
      }
    );

    console.log(
      "Verify OTP Response:",
      response.data
    );

    return response.data;
  } catch (error: any) {
    console.log(
      "Verify OTP Error:",
      error?.response?.data ||
        error
    );

    throw error;
  }
};