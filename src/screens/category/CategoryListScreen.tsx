import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../types/navigation";
import PosterCard from "../../components/HomeContent/PosterCard";

type Props = NativeStackScreenProps<RootStackParamList, "CategoryList">;

const NUM_COLUMNS = 3;

export default function CategoryListScreen({ navigation, route }: Props) {
  const { title, section } = route.params;
  const data = section?.search_tag || [];

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-black">
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>

        <Text className="ml-4 text-xl font-bold text-white">{title}</Text>
      </View>

      <FlatList
        data={data}
        key={NUM_COLUMNS}
        numColumns={NUM_COLUMNS}
        keyExtractor={(item, index) =>
          item.entryid || item.slug || index.toString()
        }
        renderItem={({ item }) => (
          <View style={{ flex: 1 / NUM_COLUMNS, padding: 8 }}>
            <PosterCard item={item} fullWidth/>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={12}
        maxToRenderPerBatch={9}
        windowSize={7}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
}