import { memo } from "react";
import {
  Pressable,
  Text,
  View,
} from "react-native";

import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Movie } from "../../types/home";
import { RootStackParamList } from "../../types/navigation";

interface PosterCardProps {
  item: Movie;
  onPress?: (movie: Movie) => void;
  fullWidth?: boolean;

  isTopTen?: boolean;
  imageType?: string;
}

type NavProp =
  NativeStackNavigationProp<RootStackParamList>;

function PosterCard({
  item,
  onPress,
  fullWidth,
  isTopTen = false,
  imageType,
}: PosterCardProps) {
  const navigation = useNavigation<NavProp>();

  const poster =
    item.thumburl?.size_200_300 ||
    (item.thumburl as any)?.[imageType ?? ""] ||
    item.thumburl?.size_480_320 ||
    item.thumburl?.size_768_1920 ||
    item.thumburl?.size_1080_1920 ||
    item.thumburl?.v_thumburl ||
    item.thumburl?.h_thumburl ||
    "";

  const handlePress = () => {
    if (onPress) {
      onPress(item);
      return;
    }

    if (item.entryid) {
      navigation.navigate("Player", {
        entryid: item.entryid,
        title: item.name,
      });
    } else if (item.category_id) {
      navigation.navigate("SeasonList", {
        categoryId:
          item.category_id.toString(),
        title: item.name,
      });
    }
  };

  return (
    <Pressable
      className={
        fullWidth
          ? "w-full"
          : "mr-4 w-36"
      }
      onPress={handlePress}
    >
      <View className="relative overflow-hidden rounded-xl bg-zinc-900">

        <Image
          source={{ uri: poster }}
          style={{
            width: "100%",
            height: fullWidth ? 180 : 210,
          }}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
          recyclingKey={
            item.entryid ?? item.slug
          }
          priority="low"
        />

        {item.ispremium === 1 && (
          <View className="absolute right-2 top-2 rounded-md bg-pink-600 px-2 py-1">
            <Text className="text-[10px] font-bold text-white">
              PREMIUM
            </Text>
          </View>
        )}

        {isTopTen &&
          item.number_thumburl && (
            <Image
              source={{
                uri: item.number_thumburl,
              }}
              style={{
                position: "absolute",
                left: -10,
                bottom: -10,
                width: 70,
                height: 70,
              }}
              contentFit="contain"
              cachePolicy="memory-disk"
            />
          )}
      </View>

      <Text
        numberOfLines={2}
        className="mt-2 text-sm font-semibold text-white"
      >
        {item.name}
      </Text>
    </Pressable>
  );
}

export default memo(PosterCard);