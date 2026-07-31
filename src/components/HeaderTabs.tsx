import { View, Text, Pressable } from "react-native";

export interface MenuItem {
  cat_id: number;
  cat_name: string;
  slug: string;
}

interface HeaderTabsProps {
  tabs: MenuItem[];
  activeTab: string;
  onTabPress: (slug: string) => void;
}

export default function HeaderTabs({
  tabs,
  activeTab,
  onTabPress,
}: HeaderTabsProps) {
  const visibleTabs = tabs.filter(({ slug }) =>
    ["home", "movies", "series", "shows"].includes(
      slug.toLowerCase()
    )
  );

  return (
    <View className="mt-6 px-5">
      <View className="flex-row items-center justify-center">
        {visibleTabs.map(({ cat_id, cat_name, slug }) => {
          const isActive = activeTab === slug;

          return (
            <Pressable
              key={cat_id}
              onPress={() => onTabPress(slug)}
              className={`mx-2 rounded-full border px-5 py-2 ${
                isActive
                  ? "border-pink-500 bg-pink-500/10"
                  : "border-zinc-700 bg-zinc-900"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  isActive
                    ? "text-pink-500"
                    : "text-white"
                }`}
              >
                {cat_name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}