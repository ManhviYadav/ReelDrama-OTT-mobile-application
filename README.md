# ReelDrama — OTT Mobile Application

A cross-platform (Android/iOS) OTT streaming mobile app built with React Native (Expo) and TypeScript. Supports OTP-based authentication, a dynamic content feed, a full Movie → Series → Season → Episode content hierarchy, and a custom video player with HLS streaming and DRM-protected playback.

## Tech Stack

- **React Native (Expo)** + **TypeScript**
- **NativeWind** (Tailwind CSS for React Native)
- **React Navigation** (native-stack)
- **TanStack React Query** — data fetching, caching, and mutations
- **Axios** — HTTP client
- **react-native-video** — HLS streaming with Widevine/FairPlay DRM support
- **expo-image**, **expo-screen-orientation**, **@react-native-community/slider**
- **AsyncStorage** — local token persistence
- **EAS Build** — custom native dev client (required for DRM/video native modules, which Expo Go does not support)

## Features

- **Authentication** — OTP-based login flow using an anonymous device token, with token persistence across sessions
- **Dynamic Home Feed** — virtualized, horizontally-scrolling sections (Top 10, Continue Watching, genre rows) fetched live from the backend
- **Content Hierarchy** — movies play directly; series route through Season → Episode selection before reaching the player
- **Custom Video Player**
  - HLS streaming with adaptive bitrate playback
  - DRM-protected premium content (Widevine on Android, FairPlay on iOS)
  - Play/pause, ±5s skip, scrub bar, fullscreen toggle with automatic orientation lock
  - Auto-hiding controls (visible on tap, hides after a few seconds while playing)
- **Continue Watching** — playback position is synced to the backend periodically and on exit; resuming a title picks up exactly where you left off
- **Subscription Gating** — premium content correctly detects entitlement and prompts users to subscribe when access is not available
- **Secure Content Delivery** — CloudFront signed-cookie authentication for protected video streams

## Project Structure

```
src/
├── components/       # Reusable UI components (cards, sections, player controls)
├── constants/         # App-wide config, read from environment variables
├── hooks/             # TanStack Query hooks wrapping each API service
├── navigation/        # React Navigation stack definition
├── screens/           # Screen-level components, grouped by feature
├── services/          # API call functions (axios-based)
├── storage/           # Local persistence helpers
├── types/             # TypeScript types for API responses and navigation
└── utils/             # Small shared utilities
```

## Getting Started

### Prerequisites

- Node.js and npm
- Expo CLI (`npm install -g eas-cli` for builds)
- Android Studio (for local Android builds) or an EAS account (for cloud builds)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/ManhviYadav/ReelDrama-OTT-mobile-application.git
   cd ReelDrama-OTT-mobile-application
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   ```bash
   cp .env.example .env
   ```
   Fill in `.env` with your own API credentials. Contact the project maintainer for staging access if needed.

4. Start the development server
   ```bash
   npx expo start --dev-client
   ```

   > **Note:** This project uses native modules (`react-native-video`, `expo-screen-orientation`, etc.) that are **not supported in Expo Go**. You'll need a custom development build — see below.

### Building a Custom Dev Client

Since this project relies on native video/DRM modules, a standard Expo Go install will not work. Build your own dev client instead:

```bash
npx expo install expo-dev-client
eas build --profile development --platform android
```

Once the build finishes, install the resulting APK on your device or emulator, then run `npx expo start --dev-client` and connect to it.

> **Note:** DRM-protected content requires a real Android/iOS device with proper Widevine/FairPlay support — most emulators do not support DRM playback.

## Environment Variables

See `.env.example` for the full list of required variables. None of these values are committed to the repository — see `.gitignore`.


## 👩‍💻 Author

**Manhvi Yadav**

- GitHub: https://github.com/ManhviYadav

---

## ⭐ Support

If you found this project useful, please give it a ⭐ on GitHub.

Your support motivates me to build more projects and continue learning.

---

## 📄 License

This project is created for learning and educational purposes.
