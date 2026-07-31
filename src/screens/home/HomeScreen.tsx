import { useCallback, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import HeaderTabs, { MenuItem } from "../../components/HeaderTabs";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import HomeContent from "../../components/HomeContent/HomeContent";

import { useMenu } from "../../hooks/useMenu";
import { useHome } from "../../hooks/useHome";
import { useLogout } from "../../hooks/useLogout";

import { getToken } from "../../services/token";

type TabName = "Home" | "Search" | "Watchlist" | "Download" | "Profile";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("home");
  const [activeFooterTab, setActiveFooterTab] = useState<TabName>("Home");
  const [token, setToken] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getToken();
      if (storedToken) setToken(storedToken);
    };
    loadToken();
  }, []);

  const { data: menuData, isLoading: isMenuLoading } = useMenu(token);
  const menu: MenuItem[] = menuData?.data?.menu || [];

  const selectedMenu = menu.find((item) => item.slug === activeCategory);
  const selectedSlug = selectedMenu?.slug || activeCategory;

  const {
    data: homeData,
    isLoading: isHomeLoading,
    refetch: refetchHome,
  } = useHome(token, selectedSlug);

  const sections = homeData?.data?.home || [];

  const { loading, handleLogout } = useLogout();

  // Refetch home data every time this screen regains focus —
  // e.g. coming back from PlayerScreen after watching/pausing a video.
  // This is what keeps the Continue Watching card in sync with actual
  // playback progress, since the mutation on Player invalidates the
  // cache but this ensures a fresh pull as soon as you land back here.
  useFocusEffect(
    // yeh chalega Jab screen dubara visible hoti hai.
    useCallback(() => {
      if (token && selectedSlug) {
        refetchHome();
      }
    }, [token, selectedSlug, refetchHome])
  );

  if (isMenuLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ec4899" />
      </View>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-black">
      <View className="flex-1">
        <HeaderTabs
          tabs={menu}
          activeTab={activeCategory}
          onTabPress={setActiveCategory}
        />

        {isHomeLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#ec4899" />
          </View>
        ) : (
          <HomeContent
            sections={sections}
            token={token}
            slug={selectedSlug}
          />
        )}
      </View>

      <Footer
        activeTab={activeFooterTab}
        onTabPress={setActiveFooterTab}
        onProfilePress={() => setShowLogoutModal(true)}
      />

      <LogoutModal
        visible={showLogoutModal}
        loading={loading}
        onCancel={() => setShowLogoutModal(false)}
        onLogout={() => handleLogout("YOUR_UUID")}
      />
    </SafeAreaView>
  );
}