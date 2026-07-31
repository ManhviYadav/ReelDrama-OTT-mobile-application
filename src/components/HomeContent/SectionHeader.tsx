import { memo } from "react";
import { View, Text, Pressable } from "react-native";

type Props = {
  title: string;
  onViewAll?: () => void;
};

function SectionHeader({ title, onViewAll }: Props) {
  return (
    <View className="mb-3 flex-row items-center justify-between px-4">
      <Text className="text-xl font-bold text-white">{title}</Text>

      {onViewAll && (
        <Pressable onPress={onViewAll} hitSlop={8}>
          <Text className="text-sm font-semibold text-pink-500">
            View All
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export default memo(SectionHeader);