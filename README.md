# ReelDrama — OTT Mobile Application

A cross-platform (Android/iOS) OTT streaming mobile app built with React Native (Expo) and TypeScript. Features OTP-based authentication, a dynamic content feed, a full Movie → Series → Season → Episode content hierarchy, and a custom video player with HLS streaming, DRM-protected playback, landscape mode, and resume-from-last-position support.

## Screenshots

### Authentication

| Splash Screen | Login | OTP Verification |
|---|---|---|
| ![Splash](./assets/screenshots/01-splash.jpg) | ![Login](./assets/screenshots/02-login.jpg) | ![OTP](./assets/screenshots/04-otp-verify.jpg) |

### Home Feed

| Carousel | Shows Tab | Top 10 Ranked |
|---|---|---|
| ![Home carousel](./assets/screenshots/07-home-carousel.jpg) | ![Shows tab](./assets/screenshots/06-home-shows-tab.jpg) | ![Top 10](./assets/screenshots/08-top10-ranked.jpg) |

| Continue Watching | Logout |
|---|---|
| ![Continue watching](./assets/screenshots/09-continue-watching.jpg) | ![Logout modal](./assets/screenshots/10-logout-modal.jpg) |

### Series Navigation

| Season Selection | Episode List |
|---|---|
| ![Seasons](./assets/screenshots/11-seasons-list.jpg) | ![Episodes](./assets/screenshots/12-episode-list.jpg) |

### Video Player

| Portrait (Controls) | Portrait (Details) | Landscape (Fullscreen) |
|---|---|---|
| ![Player controls](./assets/screenshots/13-video-player.jpg) | ![Player details](./assets/screenshots/14-player-controls-hidden.jpg) | ![Player landscape](./assets/screenshots/15-player-landscape.jpg) |

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

### Authentication
- OTP-based login flow using an Indian mobile number
- Anonymous device token issued before login, replaced with a user token on successful OTP verification
- 2-minute resend timer with live countdown
- Session persistence via AsyncStorage — no re-login needed between app launches
- Logout with confirmation modal

### Home Feed
- Auto-playing banner carousel with pagination dots
- Horizontally-scrolling, virtualized content rows: Top 10, Continue Watching, Comedy, Film, and more
- Category tabs (Home / Movies / Series / Shows) that reload the feed per category
- "View All" navigation into a full grid view for any row (except Top 10)
- Numbered ranking badges on Top 10 posters, driven directly by backend data
- "PREMIUM" badge on gated content

### Content Hierarchy
- **Movies** — tap a poster to go straight to the player
- **Series** — tap a poster to open Season selection → Episode list (with per-episode duration and description) → Player
- Handles both `entry_id`-based and `category_id`-based content lookups depending on content type

### Video Player
- Native HLS streaming via `react-native-video`, with adaptive bitrate playback
- DRM-protected playback for premium content (Widevine on Android, FairPlay on iOS), authenticated via CloudFront signed cookies
- Center play/pause button, ±5 second skip controls (YouTube-style)
- Scrubbable seek bar with live time display
- Fullscreen toggle with automatic device orientation lock (portrait ↔ landscape)
- Auto-hiding controls — visible on tap, hide automatically after a few seconds during playback
- Title and description shown below the player in portrait mode
- Subscription gate screen for premium content when the account has no active plan

### Continue Watching
- Playback position is reported to the backend periodically during playback and on exit
- Continue Watching row on Home reflects real watch progress (progress bar scaled to `played_duration / duration`)
- Tapping a Continue Watching card resumes playback from the exact last-watched position

## Project Structure
