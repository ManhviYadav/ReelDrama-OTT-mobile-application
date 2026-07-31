import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TabName =
  | "Home"
  | "Search"
  | "Watchlist"
  | "Download"
  | "Profile";

interface FooterProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
  onProfilePress: () => void;
}

const tabs: {
  name: TabName;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    name: "Home",
    icon: "home",
  },
  {
    name: "Search",
    icon: "search",
  },
  {
    name: "Watchlist",
    icon: "bookmark-outline",
  },
  {
    name: "Download",
    icon: "download-outline",
  },
  {
    name: "Profile",
    icon: "person-outline",
  },
];

export default function Footer({
  activeTab,
  onTabPress,
  onProfilePress,
}: FooterProps) {
  return (
    <View className="flex-row items-center justify-between border-t border-zinc-800 bg-[#111111] px-5 py-7">
      {tabs.map(({ name, icon }) => {
        const isActive = activeTab === name;

        return (
          <Pressable
            key={name}
            className="items-center"
            onPress={() => {
              onTabPress(name);

              if (name === "Profile") {
                onProfilePress();
              }
            }}
          >
            <Ionicons
              name={icon}
              size={24}
              color={isActive ? "#ec4899" : "#9ca3af"}
            />

            <Text
              className={`mt-1 text-xs ${
                isActive
                  ? "text-pink-500"
                  : "text-gray-400"
              }`}
            >
              {name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}