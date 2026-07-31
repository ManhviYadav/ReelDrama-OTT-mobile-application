import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import { RootStackParamList } from "../../types/navigation";
import { getToken } from "../../services/token";
import { useSeasonList } from "../../hooks/useSeasonList";
import { Season } from "../../types/season";

type Props = NativeStackScreenProps<RootStackParamList, "SeasonList">;

export default function SeasonListScreen({ navigation, route }: Props) {
  const { categoryId, title } = route.params;
  const [token, setToken] = useState("");

  useEffect(() => {
    getToken().then((t) => {
      if (t) setToken(t);
    });
  }, []);

  const { data, isLoading } = useSeasonList(token, categoryId);
  const seasons: Season[] = data?.data?.seasons || [];

  const handleSelectSeason = (season: Season) => {
  navigation.navigate("EpisodeList", {
    seasonId: season.seasons_id.toString(),
    seasonName: season.seasons_name,
    seriesTitle: title,
  });
};

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-black">
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>

        <Text className="ml-4 text-xl font-bold text-white">{title}</Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#ec4899" />
        </View>
      ) : (
        <FlatList
          data={seasons}
          keyExtractor={(item) => item.seasons_id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelectSeason(item)}
              className="mb-4 flex-row overflow-hidden rounded-xl bg-zinc-900"
            >
              <Image
                source={{
                  uri:
                    item.seasons_thumbnail?.size_200_300 ||
                    item.seasons_thumbnail?.size_480_320 ||
                    item.seasons_thumbnail?.v_thumburl,
                }}
                style={{ width: 100, height: 140 }}
                contentFit="cover"
              />

              <View className="flex-1 justify-center px-3">
                <Text className="text-base font-bold text-white">
                  {item.seasons_name}
                </Text>
                <Text className="mt-1 text-xs text-gray-400">
                  {item.season_episodes_count} Episodes
                </Text>
                <Text numberOfLines={3} className="mt-2 text-xs text-gray-300">
                  {item.seasons_description}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}