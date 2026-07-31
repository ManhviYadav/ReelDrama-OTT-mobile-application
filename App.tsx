import "./global.css";
import { useEffect, useState } from "react";
import * as SplashScreenNative from "expo-splash-screen";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import AppNavigator from "./src/navigation/AppNavigator";
import SplashScreen from "./src/screens/SplashScreen";

SplashScreenNative.preventAutoHideAsync();

const queryClient = new QueryClient();


const MIN_SPLASH_DURATION_MS = 3500;


const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
       
        await Promise.all([wait(MIN_SPLASH_DURATION_MS) ]);
      } catch (e) {
        console.warn("Error while preparing app:", e);
      } finally {
      
        await SplashScreenNative.hideAsync();
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  if (!appReady) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}