import  { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

import CustomButton from "../../components/CustomButton";

import {
  sendOtp,
  verifyOtp,
} from "../../services/auth";

import {
  getToken,
  saveToken,
} from "../../services/token";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "OTP"
>;

const CELL_COUNT = 6;
const RESEND_SECONDS = 120;

export default function OtpScreen({
  navigation,
  route,
}: Props) {
  const { mobile } = route.params;

  const [otp, setOtp] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const [secondsLeft, setSecondsLeft] =
    useState(RESEND_SECONDS);

  const ref = useBlurOnFulfill({
    value: otp,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] =
    useClearByFocusCell({
      value: otp,
      setValue: setOtp,
    });

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (
    seconds: number
  ) => {
    const mins = Math.floor(
      seconds / 60
    )
      .toString()
      .padStart(2, "0");

    const secs = (seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${mins}:${secs}`;
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert(
        "Invalid OTP",
        "Please enter a valid OTP."
      );
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();

      if (!token) {
        Alert.alert(
          "Error",
          "Token not found"
        );
        return;
      }

      const response =
        await verifyOtp(
          mobile,
          otp,
          token
        );

      console.log(
        "Verify OTP Response",
        response
      );

      const userToken =
        response?.data?.token ||
        response?.token ||
        response?.access_token;

      if (userToken) {
        await saveToken(userToken);
      }

    

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Verification Failed",
        "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);

      const token = await getToken();

      if (!token) return;

      await sendOtp(
        mobile,
        token
      );

      setOtp("");
      setSecondsLeft(
        RESEND_SECONDS
      );

    
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to resend OTP"
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/image.png")}
      className="flex-1"
      blurRadius={6}
    >
      <View className="flex-1 px-6 pt-20">

        <Text className="text-white text-3xl font-bold">
          Verify OTP
        </Text>

        <Text className="text-gray-300 mt-3">
          Please enter the OTP sent
          to your mobile number
        </Text>

        <Text className="text-white text-base mt-8">
          +91 {mobile}
        </Text>


        <CodeField
          ref={ref}
          {...props}
          value={otp}
          onChangeText={setOtp}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          rootStyle={{
            marginTop: 30,
          }}
          renderCell={({
            index,
            symbol,
            isFocused,
          }) => (
            <View
              key={index}
              onLayout={getCellOnLayoutHandler(
                index
              )}
              className={`w-14 h-14 rounded-xl justify-center items-center mx-1 border ${
                isFocused
                  ? "border-fuchsia-500"
                  : "border-gray-500"
              } bg-white/10`}
            >
              <Text className="text-white text-xl font-bold">
                {symbol ||
                  (isFocused ? (
                    <Cursor />
                  ) : null)}
              </Text>
            </View>
          )}
        />

        {secondsLeft > 0 ? (
          <Text className="text-pink-500 mt-6">
            Resend OTP in{" "}
            {formatTime(
              secondsLeft
            )}
          </Text>
        ) : (
          <Text
            className="text-pink-500 mt-6"
            onPress={
              resending
                ? undefined
                : handleResendOtp
            }
          >
            {resending
              ? "Resending..."
              : "Resend OTP"}
          </Text>
        )}

        <View className="mt-auto mb-10">
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#c026d3"
            />
          ) : (
            <CustomButton
              title="Verify"
              onPress={
                handleVerify
              }
            />
          )}
        </View>

      </View>
    </ImageBackground>
  );
}