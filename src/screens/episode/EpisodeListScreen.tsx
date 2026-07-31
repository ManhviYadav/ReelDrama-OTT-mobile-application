import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../types/navigation";
import { getToken } from "../../services/token";
import { useEpisodeList } from "../../hooks/useEpisodeList";
import { Episode } from "../../types/episode";

type Props = NativeStackScreenProps<RootStackParamList, "EpisodeList">;

const formatDuration = (ms: number) => {
  const totalMinutes = Math.floor(ms / 60000); // 1k ms= 1 sec, 60k ms= 60 sec=  1 min
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
};

export default function EpisodeListScreen({ navigation, route }: Props) {
  const { seasonId, seasonName, seriesTitle } = route.params;
  const [token, setToken] = useState("");

  useEffect(() => {
    //AsyncStorage se JWT Token nikalta hai
    getToken().then((t) => {
      if (t) setToken(t);
    });
  }, []);

  const { data, isLoading } = useEpisodeList(token, seasonId);
  const episodes: Episode[] = data?.data?.episodes || [];
// eps ki ek array jisme sare eps ke obj honge
  const handleSelectEpisode = (episode: Episode) => {
    navigation.navigate("Player", {
      entryid: episode.entryid,
      title: `${seriesTitle} | ${episode.name}`,
    });
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-black">
      <View className="px-4 py-3">
        <View className="flex-row items-center">
          <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>

          <Text className="ml-4 text-xl font-bold text-white">
            {seriesTitle}
          </Text>
        </View>

        <Text className="ml-9 mt-1 text-sm text-gray-400">{seasonName}</Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#ec4899" />
        </View>
      ) : (
        <FlatList
          data={episodes}
          keyExtractor={(item) => item.entryid}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => handleSelectEpisode(item)}
              className="mb-4 flex-row overflow-hidden rounded-xl bg-zinc-900"
            >
              <View className="relative">
                <Image
                  source={{
                    uri:
                      item.thumburl?.size_480_320 ||
                      item.thumburl?.v_thumburl ||
                      item.thumburl?.size_1080_1920,
                  }}
                  style={{ width: 140, height: 90 }}
                  contentFit="cover"
                />

                {item.ispremium === 1 && (
                  <View className="absolute right-1 top-1 rounded bg-pink-600 px-1.5 py-0.5">
                    <Text className="text-[9px] font-bold text-white">
                      PREMIUM
                    </Text>
                  </View>
                )}
              </View>

              <View className="flex-1 justify-center px-3">
                <Text className="text-sm font-bold text-white">
                  {item.name}
                </Text>

                <Text className="mt-1 text-xs text-gray-400">
                  {formatDuration(item.duration)}
                </Text>

                <Text numberOfLines={2} className="mt-1 text-xs text-gray-300">
                  {item.description}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}