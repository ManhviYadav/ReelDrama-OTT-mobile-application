import { memo } from "react";
import { View, FlatList } from "react-native";

import PosterCard from "./PosterCard";
import SectionHeader from "./SectionHeader";
import { Section } from "../../types/home";

type Props = {
  section: Section;
  isTopTen?: boolean;
  onViewAll?: (section: Section) => void;
};

function HomeSection({
  section,
  isTopTen = false,
  onViewAll,
}: Props) {
  const data = section?.search_tag || [];

  if (data.length === 0) {
    return null;
  }

  return (
    <View className="mt-6">
      <SectionHeader
        title={section.title_tag_name}
        onViewAll={
          onViewAll
            ? () => onViewAll(section)
            : undefined
        }
      />

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) =>
          item.entryid ||
          item.slug ||
          index.toString()
        }
        renderItem={({ item }) => (
          <PosterCard
            item={item}
            isTopTen={isTopTen}
            imageType={section.image_type}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={3}
        removeClippedSubviews
      />
    </View>
  );
}

export default memo(HomeSection);