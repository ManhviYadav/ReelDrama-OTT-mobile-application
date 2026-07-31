import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { Image } from "expo-image";

export default function SplashScreen() {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(12)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo mark pops in first.
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 550,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),
      // Wordmark fades/slides up right after.
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
    
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.06,
            duration: 900,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Animated.View
        style={{
          opacity: logoOpacity,
          transform: [{ scale: Animated.multiply(logoScale, pulse) }],
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 160, height: 160 }}
          contentFit="contain"
        />
      </Animated.View>

      <Animated.Text
        className="mt-2 text-3xl font-extrabold tracking-widest text-white"
        style={{
          opacity: textOpacity,
          transform: [{ translateY: textTranslateY }],
        }}
      >
        REELDRAMA
      </Animated.Text>
    </View>
  );
} 