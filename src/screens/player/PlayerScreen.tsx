import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Video, {
  OnProgressData,
  OnLoadData,
  VideoRef,
  DRMType,
} from "react-native-video";
import * as ScreenOrientation from "expo-screen-orientation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../types/navigation";
import { getToken } from "../../services/token";
import { usePlayVideo } from "../../hooks/usePlayVideo";
import { stripHtml } from "../../utils/stripHtml";
import PlayerControls from "../../components/player/PlayerControls";
import SeekBar from "../../components/player/SeekBar";
import { useUpdateContinueWatching } from "../../hooks/useUpdateContinueWatching";

type Props = NativeStackScreenProps<RootStackParamList, "Player">;

const SEEK_SECONDS = 5;
const HIDE_DELAY_MS = 3000;
const PROGRESS_REPORT_INTERVAL_MS = 30000;

export default function PlayerScreen({ navigation, route }: Props) {
  const { entryid, title: titleParam, resumeFrom } = route.params;

  const [token, setToken] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoError, setVideoError] = useState<string | null>(null);
  const { mutate: updateContinueWatching } = useUpdateContinueWatching(token);

  const videoRef = useRef<VideoRef>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentTimeRef = useRef(0);
  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);

  useEffect(() => {
    getToken().then((t) => {
      if (t) setToken(t);
    });
  }, []);

  const { data, isLoading, isError, error } = usePlayVideo(token, {
    entryid,
  });

  const videoData = data?.data?.video?.[0];

  const hlsUrl = videoData?.download_url;
  const title = videoData?.name ?? titleParam;
  const description = stripHtml(videoData?.long_description);
  const isDrm = videoData?.is_drm === 1;

  // TEMPORARY DEBUG LOG — remove once DRM behavior is fully confirmed.
  useEffect(() => {
    if (videoData) {
      console.log("DRM check:", {
        entryid,
        name: videoData?.name,
        raw_is_drm: videoData?.is_drm,
        typeof_is_drm: typeof videoData?.is_drm,
        isDrm,
        ispremium: videoData?.ispremium,
        status: videoData?.status,
        download_url: videoData?.download_url,
      });
    }
  }, [videoData]);

  const needsSubscription = videoData?.status === 0;
  const gateMessage =
    videoData?.message || "Please subscribe to watch this title.";
  const subscribeCta = data?.data?.play_button_message;

  const awsAuth = videoData?.aws;
  const cloudFrontCookieHeader = awsAuth
    ? `CloudFront-Policy=${awsAuth["CloudFront-Policy"]}; CloudFront-Signature=${awsAuth["CloudFront-Signature"]}; CloudFront-Key-Pair-Id=${awsAuth["CloudFront-Key-Pair-Id"]}`
    : undefined;

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const armHideTimer = () => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, HIDE_DELAY_MS);
  };

  useEffect(() => {
    if (showControls) {
      armHideTimer();
    } else {
      clearHideTimer();
    }
    return clearHideTimer;
  }, [showControls, isPlaying]);

  const handleVideoTap = () => {
    setShowControls(true);
    armHideTimer();
  };

  const keepControlsVisible = () => {
    setShowControls(true);
    armHideTimer();
  };

  const handleToggleFullscreen = async () => {
    keepControlsVisible();
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    } else {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
  }, []);

  const handleSeek = (seconds: number) => {
    keepControlsVisible();
    videoRef.current?.seek(seconds);
    setCurrentTime(seconds);
  };

  const handleSeekBack = () => {
    handleSeek(Math.max(0, currentTime - SEEK_SECONDS));
  };

  const handleSeekForward = () => {
    handleSeek(Math.min(duration, currentTime + SEEK_SECONDS));
  };

  const handlePlayPause = () => {
    keepControlsVisible();
    setIsPlaying((prev) => !prev);
  };

  const handleProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
  };

  const handleLoad = (data: OnLoadData) => {
    setDuration(data.duration);

    if (resumeFrom && resumeFrom > 0) {
      const resumeSeconds = resumeFrom / 1000;
      videoRef.current?.seek(resumeSeconds);
      setCurrentTime(resumeSeconds);
    }
  };

  useEffect(() => {
    if (!entryid || !isPlaying) return;

    const interval = setInterval(() => {
      updateContinueWatching({
        entryId: entryid,
        durationMs: Math.round(currentTimeRef.current * 1000),
      });
    }, PROGRESS_REPORT_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [entryid, isPlaying]);

  useEffect(() => {
    return () => {
      if (entryid && currentTimeRef.current > 0) {
        updateContinueWatching({
          entryId: entryid,
          durationMs: Math.round(currentTimeRef.current * 1000),
        });
      }
    };
  }, []);

  const handleGoHome = async () => {
    if (entryid && currentTime > 0) {
      try {
        await new Promise((resolve, reject) => {
          updateContinueWatching(
            {
              entryId: entryid,
              durationMs: Math.round(currentTime * 1000),
            },
            {
              onSuccess: resolve,
              onError: reject,
            }
          );
        });
      } catch (e) {
        console.log("Failed to save continue watching before navigating:", e);
      }
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ec4899" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-6">
        <Text className="text-center text-white">Failed to load video.</Text>
        <Text className="mt-2 text-center text-xs text-gray-400">
          {(error as any)?.message ?? "Unknown error"}
        </Text>
        <Pressable onPress={handleGoHome} className="mt-6">
          <Text className="text-pink-500">Go to Home</Text>
        </Pressable>
      </View>
    );
  }

  if (needsSubscription) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-6">
        <Text className="text-center text-lg font-semibold text-white">
          {gateMessage}
        </Text>

        {subscribeCta === "Subscribe Now" && (
          <Text className="mt-2 text-center text-sm text-gray-400">
            Subscribe to continue watching.
          </Text>
        )}

        <Pressable
          onPress={handleGoHome}
          className="mt-6 rounded-full bg-pink-600 px-6 py-3"
        >
          <Text className="font-semibold text-white">Subscribe Now</Text>
        </Pressable>

        <Pressable onPress={handleGoHome} className="mt-4">
          <Text className="text-pink-500">Go to Home</Text>
        </Pressable>
      </View>
    );
  }

  if (!hlsUrl) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-6">
        <Text className="text-center text-white">
          No playable video found for this title.
        </Text>
        <Pressable onPress={handleGoHome} className="mt-6">
          <Text className="text-pink-500">Go to Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView
      edges={isFullscreen ? [] : ["top"]}
      className="flex-1 bg-black"
    >
      <StatusBar hidden={isFullscreen} />

      <View className={isFullscreen ? "flex-1" : "aspect-video w-full"}>
        <Video
          ref={videoRef}
          source={{
            uri: hlsUrl,
            headers: cloudFrontCookieHeader
              ? { Cookie: cloudFrontCookieHeader }
              : undefined,
            ...(isDrm && {
              drm: {
                type:
                  Platform.OS === "android"
                    ? DRMType.WIDEVINE
                    : DRMType.FAIRPLAY,
                licenseServer: videoData?.drm_license_url,
                certificateUrl:
                  Platform.OS === "ios"
                    ? videoData?.certificate_url
                    : undefined,
              },
            }),
          }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
          paused={!isPlaying}
          onProgress={handleProgress}
          onLoad={handleLoad}
          onError={(e) => {
            console.log("Video playback error:", e);
            setVideoError(e?.error?.errorString ?? "Video failed to play");
          }}
        />

        <Pressable className="absolute inset-0" onPress={handleVideoTap} />

        {videoError && (
          <View className="absolute inset-0 items-center justify-center bg-black/80 px-6">
            <Text className="text-center text-white">{videoError}</Text>
          </View>
        )}

        {showControls && !videoError && (
          <View
            className="absolute inset-0 justify-between bg-black/30 px-2 py-3"
            pointerEvents="box-none"
          >
            <View className="flex-row items-center" pointerEvents="box-none">
              <Pressable onPress={handleGoHome} hitSlop={12}>
                <Ionicons name="arrow-back" size={26} color="#fff" />
              </Pressable>
            </View>

            <PlayerControls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onSeekBack={handleSeekBack}
              onSeekForward={handleSeekForward}
            />

            <View pointerEvents="box-none">
              <SeekBar
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
              />

              <View className="flex-row justify-end px-4 pb-2">
                <Pressable onPress={handleToggleFullscreen} hitSlop={12}>
                  <Ionicons
                    name={isFullscreen ? "contract" : "expand"}
                    size={24}
                    color="#fff"
                  />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </View>

      {!isFullscreen && (
        <View className="px-4 pt-4">
          <Text className="text-xl font-bold text-white">{title}</Text>

          <Text className="mt-3 text-sm leading-5 text-gray-300">
            {description}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}