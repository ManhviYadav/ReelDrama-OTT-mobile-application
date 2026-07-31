import { memo } from "react";
import { View, FlatList } from "react-native";

import ContinueCard from "./ContinueCard";
import SectionHeader from "./SectionHeader";
import { Section } from "../../types/home";

type Props = {
  section: Section;
  onViewAll?: (section: Section) => void;
};

function ContinueWatchingSection({ section, onViewAll }: Props) {
  const data = section?.search_tag || [];

  if (data.length === 0) { //if conti watch empty dont show this comp
    return null;
  }

  return (
    <View className="mt-6">
      <SectionHeader
        title={section.title_tag_name}
        onViewAll={onViewAll ? () => onViewAll(section) : undefined}
      />

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) =>
          item.entryid || item.slug || index.toString()
        }
        renderItem={({ item }) => <ContinueCard item={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={3}
        removeClippedSubviews
      />
    </View>
  );
}

export default memo(ContinueWatchingSection);