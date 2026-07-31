```md
# 🎬 ReelDrama — OTT Mobile Application

A cross-platform **OTT streaming mobile application** built with **React Native (Expo)** and **TypeScript**. The application provides OTP-based authentication, dynamic content browsing, a complete **Movie → Series → Season → Episode** navigation flow, and a custom video player with **HLS streaming** and **DRM-protected playback**.

---

## 📱 Demo

Watch the application in action below:

**🎥 Demo Video**

> Replace the placeholder below with the GitHub-generated video URL after uploading your `.mp4` file to the README.

```

https://github.com/user-attachments/assets/YOUR-VIDEO-ID

````

### Demo Highlights

- 🔐 OTP Authentication
- 🏠 Dynamic Home Screen
- 🎞️ Featured Carousel
- 🎬 Movies & TV Series
- 📺 Season & Episode Navigation
- ▶️ Custom Video Player
- ⏩ Seek, Play/Pause & Fullscreen
- 📌 Continue Watching
- 🔒 DRM Protected Streaming
- 🚪 Logout Flow

---

## ✨ Features

### 🔐 Authentication

- OTP-based login flow
- Anonymous device token generation
- Secure JWT authentication
- Persistent login using AsyncStorage

### 🏠 Dynamic Home Feed

- Horizontally scrolling content rows
- Live content fetched from backend APIs
- Optimized rendering with virtualized lists

### 🎬 Content Browsing

- Browse Movies and TV Series
- Season and Episode navigation
- Dynamic API-driven content

### ▶️ Custom Video Player

- HLS adaptive bitrate streaming
- Widevine DRM (Android)
- FairPlay DRM (iOS)
- Play/Pause controls
- Forward & Rewind
- Interactive seek bar
- Fullscreen mode
- Auto-hide player controls
- Orientation lock

### 📌 Continue Watching

- Playback position synchronization
- Resume videos from the last watched position

### 💳 Subscription Gating

- Detects premium content
- Prompts users to subscribe when required

### 🔒 Secure Streaming

- CloudFront signed-cookie authentication
- Protected video delivery

---

## 🛠 Tech Stack

- React Native (Expo)
- TypeScript
- NativeWind
- React Navigation
- TanStack React Query
- Axios
- react-native-video
- expo-image
- expo-screen-orientation
- @react-native-community/slider
- AsyncStorage
- Expo EAS Build

---

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components
├── constants/        # Environment configuration
├── hooks/            # React Query custom hooks
├── navigation/       # Navigation setup
├── screens/          # Application screens
├── services/         # API service functions
├── storage/          # Local storage utilities
├── types/            # TypeScript definitions
└── utils/            # Shared helper functions
````

---

## 🚀 Getting Started

### Prerequisites

* Node.js
* npm
* Android Studio
* Expo CLI
* EAS CLI

Install EAS CLI:

```bash
npm install -g eas-cli
```

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/ManhviYadav/ReelDrama-OTT-mobile-application.git
```

Navigate to the project:

```bash
cd ReelDrama-OTT-mobile-application
```

Install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Fill in the required API credentials.

> Environment variables are intentionally excluded from version control.

---

## ▶️ Run the Project

Start the development server:

```bash
npx expo start --dev-client
```

> **Note:** This project uses native modules such as `react-native-video` and `expo-screen-orientation`, which are **not supported in Expo Go**.

---

## 🏗 Building a Development Client

Install Expo Dev Client:

```bash
npx expo install expo-dev-client
```

Create a development build:

```bash
eas build --profile development --platform android
```

Install the generated APK on your device or emulator.

Start Metro:

```bash
npx expo start --dev-client
```

> DRM-protected content requires a physical Android or iOS device. Most emulators do not support Widevine or FairPlay DRM.

---

## 📦 Major Libraries

* React Native
* Expo
* TypeScript
* NativeWind
* React Navigation
* TanStack React Query
* Axios
* react-native-video
* AsyncStorage
* Expo Image
* Expo Screen Orientation

---

## 📱 Supported Platforms

* ✅ Android
* ✅ iOS

---

## 🔐 Security

* JWT Authentication
* Anonymous Device Token
* CloudFront Signed Cookies
* DRM Protected Streaming
* Secure API Communication

---

## 📄 License

This project is intended for **educational and portfolio purposes**.

The streaming content, backend APIs, and related assets belong to their respective owners and are **not included** in this repository.

```
```
