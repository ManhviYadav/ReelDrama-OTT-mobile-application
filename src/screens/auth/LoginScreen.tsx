import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import CustomButton from '../../components/CustomButton';

import { getAnonymousToken, sendOtp } from '../../services/auth';

import { saveToken } from '../../services/token';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [mobile, setMobile] = useState('');

  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    try {
      if (mobile.length !== 10) {
        Alert.alert('Invalid Number', 'Enter a valid mobile number');
        return;
      }

      setLoading(true);

      const token = await getAnonymousToken();

      await saveToken(token);

      await sendOtp(mobile, token);

      navigation.navigate('OTP', {
        mobile,
      });
    } catch (error) {
      console.log(error);

      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/image.png')}
      className="flex-1"
      blurRadius={5}>
      <View className="flex-1 justify-center px-6">
        <View className="mb-12 items-center">
          <Image
            source={require('../../../assets/logo.png')}
            className="h-40 w-40"
            resizeMode="contain"
          />
        </View>

        <Text className="mb-8 text-center text-white">
          Kindly Note: Only Indian mobile numbers are accepted for SMS verification.
        </Text>

        <View className="flex-row overflow-hidden rounded-xl bg-black/70">
          <View className="justify-center px-4">
            <Text className="text-white">+91</Text>
          </View>

          <TextInput
            placeholder="Enter Mobile No."
            placeholderTextColor="#aaa"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
            className="flex-1 py-4 text-white"
          />
        </View>

        <View className="mt-8">
          {loading ? (
            <ActivityIndicator size="large" color="#c026d3" />
          ) : (
            <CustomButton title="Continue"
            onPress={handleContinue} />
          )}
        </View>

        <Text className="mt-5 text-center text-xs text-gray-300">
          By Continuing you agree to ReelDrama's Terms and Conditions
        </Text>
      </View>
    </ImageBackground>
  );
}
