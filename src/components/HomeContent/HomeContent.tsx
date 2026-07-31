import { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ContinueWatchingSection from "./ContinueWatchingSection";
import HomeSection from "./HomeSection";
import HomeCarousel from "../HomeCarousel";

import { Section } from "../../types/home";
import { RootStackParamList } from "../../types/navigation";

type Props = {
  sections: Section[];
  token: string;
  slug: string;
};

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeContent({
  sections,
  token,
  slug,
}: Props) {
  const navigation = useNavigation<NavProp>();

  const handleViewAll = useCallback(
    (section: Section) => {
      navigation.navigate("CategoryList", {
        title: section.title_tag_name,
        section,
      });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<Section> = useCallback(
    ({ item }) => {
      switch (item.cat_type) {
        case "continue_watching":
          return (
            <ContinueWatchingSection
              section={item}
              onViewAll={handleViewAll}
            />
          );

        default:
          return (
            <HomeSection
              section={item}
              isTopTen={item.cat_type === "top_10"}
              onViewAll={handleViewAll}
            />
          );
      }
    },
    [handleViewAll]
  );

  const keyExtractor = useCallback(
    (item: Section, index: number) =>
      `${item.cat_type}-${item.title_tag_name}-${index}`,
    []
  );

  return (
    <FlatList
      data={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={
        <HomeCarousel token={token} slug={slug} />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
      initialNumToRender={3}
      maxToRenderPerBatch={2}
      updateCellsBatchingPeriod={50}
      windowSize={5}
      removeClippedSubviews
    />
  );
}