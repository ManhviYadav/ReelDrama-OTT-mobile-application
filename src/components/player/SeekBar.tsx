import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

type Props = {
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
};

const formatTime = (seconds: number) => {
  // if seconds is 0 or undefinded return null 
  // if seconds is not a number return 0:00
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    // padstart only works with string- yeh sec ko 2 digits m show krega 
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

export default function SeekBar({ currentTime, duration, onSeek }: Props) {
  return (
    <View className="flex-row items-center px-4">
      {/* sec ko min mei show krega */}
      <Text className="w-12 text-xs text-white">
        {formatTime(currentTime)}
      </Text>

      <Slider
        style={{ flex: 1, height: 30 }}
        minimumValue={0}
        // if duration 0 slider not crash (||1)
        maximumValue={duration || 1}
        value={currentTime}
        minimumTrackTintColor="#ec4899"
        maximumTrackTintColor="#ffffff50"
        thumbTintColor="#ec4899"
        onSlidingComplete={onSeek}
      />

      <Text className="w-12 text-xs text-white">{formatTime(duration)}</Text>
    </View>
  );
}