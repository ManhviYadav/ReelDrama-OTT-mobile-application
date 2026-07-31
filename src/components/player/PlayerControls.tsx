import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeekBack: () => void;
  onSeekForward: () => void;
};

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onSeekBack,
  onSeekForward,
}: Props) {
  return (
    <View className="flex-row items-center justify-center">
      <Pressable
        onPress={onSeekBack}
        hitSlop={12}
        className="mx-6 items-center justify-center"
      >
        <Ionicons name="play-back" size={32} color="#fff" />
      </Pressable>

      <Pressable
        onPress={onPlayPause}
        hitSlop={12}
        className="mx-6 h-16 w-16 items-center justify-center rounded-full bg-white/20"
      >
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={36}
          color="#fff"
        />
      </Pressable>

      <Pressable
        onPress={onSeekForward}
        hitSlop={12}
        className="mx-6 items-center justify-center"
      >
        <Ionicons name="play-forward" size={32} color="#fff" />
      </Pressable>
    </View>
  );
}