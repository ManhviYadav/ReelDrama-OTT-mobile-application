import { memo } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../types/navigation";

type Props = {
  item: any;
};

type NavProp = NativeStackNavigationProp<RootStackParamList>;

function ContinueCard({
  item,
}: Props) {
  const navigation = useNavigation<NavProp>();

  const poster =
    item.thumburl?.size_200_300 ??
    item.thumburl?.size_1080_1920;

  const durationMs = item.duration ?? 0; // total duration
  const playedMs = item.played_duration ?? 0; // how much watched
  const progressPercent =
    durationMs > 0
      ? Math.min(100, (playedMs / durationMs) * 100)
      : 0;

  const handlePress = () => {
    if (item.entryid) {
      navigation.navigate("Player", {
        entryid: item.entryid,
        title: item.name,
        resumeFrom: playedMs,
      });
    }
  };

  return (
    <Pressable className="mr-4 w-36" onPress={handlePress}>

      <Image
        source={{ uri: poster }}
        contentFit="cover"
        style={{
          width: "100%",
          height: 200,
          borderRadius: 12,
        }}
      />

      <Text
        numberOfLines={2}
        className="mt-2 text-sm font-semibold text-white"
      >
        {item.name}
      </Text>

      <View className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-700">

        <View
          className="h-full rounded-full bg-pink-500"
          style={{
            width: `${progressPercent}%`,
          }}
        />

      </View>

    </Pressable>
  );
}

export default memo(ContinueCard);