import { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Carousel from "react-native-reanimated-carousel";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useCarousel } from "../hooks/useCarousel";
import { RootStackParamList } from "../types/navigation";

const { width } = Dimensions.get("window");

type Props = {
  token: string;
  slug: string;
};

interface CarouselItem {
  entryid: string;
  imgurl: string;
  title: string;
  language: string;
  genre: string;
  category_id: number;
  season_id: number;
}

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeCarousel({ token, slug }: Props) {
  const [activeIndex, setActiveIndex] = useState(0); //to update pagionation dots
  const navigation = useNavigation<NavProp>();

  const { data, isLoading, error } = useCarousel(token, slug);

  const handlePlayPress = (item: CarouselItem) => {
    navigation.navigate("Player", {
      entryid: item.entryid,
      title: item.title,
      resumeFrom: 0,
    });
  };

  if (isLoading) {
    return (
      <View className="items-center py-10">
        <ActivityIndicator size="large" color="#ec4899" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center py-10">
        <Text className="text-red-500">Failed to load carousel</Text>
      </View>
    );
  }

  const carouselData: CarouselItem[] = data?.data?.carousel || [];

  if (carouselData.length === 0) {
    return (
      <View className="items-center py-20">
        <Text className="text-white">No banners available</Text>
      </View>
    );
  }

  return (
    <View>
      <Carousel
        width={width}
        height={520}
        data={carouselData}
        loop
        autoPlay
        autoPlayInterval={2000}
        pagingEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 10,
        }}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <View className="items-center">
            <View
              style={{
                width: width - 32,
              }}
              className="overflow-hidden "
            >
              <View className="relative">
                <Image
                  source={{
                    uri: item.imgurl,
                  }}
                  style={{
                    width: "100%",
                    height: 520,
                  }}
                  contentFit="cover"
                />

                {/* title and meta data */}
                <View className="absolute bottom-6 left-5">
                  <Text
                    className="font-bold text-white"
                    style={{
                      fontSize: 25,
                    }}
                  >
                    {item.title}
                  </Text>

                  <Text className="mt-1 text-cyan-400">
                    {item.language} | {item.genre}
                  </Text>
                </View>

              
              
                <View className="absolute bottom-5 right-5">
                  <TouchableOpacity
                    className="h-14 w-14 items-center justify-center rounded-xl bg-pink-500"
                    onPress={() => handlePlayPress(item)}
                  >
                    <Text
                      className="text-white"
                      style={{
                        fontSize: 25,
                      }}
                    >
                      ▶
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />

      {/* Pagination dots */}
      <View className=" flex-row justify-center">
        {carouselData.map((_, index) => {
          const isActive = index === activeIndex;

          return (
            <View
              key={index}
              className={`mx-1 rounded-full ${
                isActive ? "bg-pink-500" : "bg-white/30"
              }`}
              style={{
                width: isActive ? 20 : 8,
                height: 8,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}