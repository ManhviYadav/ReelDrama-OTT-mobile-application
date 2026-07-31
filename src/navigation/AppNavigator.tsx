import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlayerScreen from "../screens/player/PlayerScreen";

import LoginScreen from "../screens/auth/LoginScreen";
import OtpScreen from "../screens/auth/OtpScreen";
import HomeScreen from "../screens/home/HomeScreen";
import CategoryListScreen from "../screens/category/CategoryListScreen";
import EpisodeListScreen from "../screens/episode/EpisodeListScreen";
import SeasonListScreen from "../screens/season/SeasonListScreen";

import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OtpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CategoryList" component={CategoryListScreen} />
        <Stack.Screen name="SeasonList" component={SeasonListScreen} />
        <Stack.Screen name="EpisodeList" component={EpisodeListScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}