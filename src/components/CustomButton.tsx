import { Pressable, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export default function CustomButton({
  title,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-fuchsia-600 py-4 rounded-xl"
    >
      <Text className="text-center text-white font-bold">
        {title}
      </Text>
    </Pressable>
  );
}