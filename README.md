# Wiingr — Find Your Gym Buddy

**Wiingr** is a health and wellness community app for iOS and Android that matches people with nearby workout partners who share their fitness goals, lifestyle and interests — with chat, communities, meal plans and exercise options built in.

Built solo with **React Native** and **Expo**, backed by **Firebase**, and released on the **Apple App Store**.

<!-- Screenshots: add 3–4 phone screenshots (onboarding, matches, chat, meal plan) and replace the line below -->
<!-- <p><img src="docs/screens/onboarding.png" width="220"/> <img src="docs/screens/matches.png" width="220"/> <img src="docs/screens/chat.png" width="220"/></p> -->

---

## Features

- **Gym-buddy matching** — matches based on gym location and distance, fitness goals, interests (pick up to 6) and lifestyle habits, with a compatibility view.
- **Location-aware discovery** — adjustable distance filter to find workout partners closest to you (Expo Location, with clear permission prompts).
- **Chat** — one-to-one messaging with matches, plus likes and friend requests.
- **Communities & events** — interest-based communities and community events.
- **Meal plans & exercise options** — nutrition and workout guidance alongside the social features.
- **Onboarding & verification** — phone sign-up with OTP verification, guided profile setup and photo uploads.
- **Account controls** — pause, deactivate or delete your profile; privacy preferences; in-app support and reporting.
- **Over-the-air updates** — cosmetic changes and fixes ship instantly with Expo Updates; native changes go through EAS Build.

## Tech stack

| Area | Tools |
|---|---|
| App | React Native 0.72, Expo SDK 49, React 18 |
| Navigation | React Navigation (native stack, stack, bottom tabs) |
| UI | styled-components, React Native Paper, React Native Elements, Lottie animations, Expo Google Fonts, theme context |
| Backend | Firebase Auth, Firestore, App Check (`@react-native-firebase`) |
| Device features | Expo Camera, Image Picker, Image Manipulator, Location, Notifications, AV, Mail Composer |
| Testing & quality | Jest (`jest-expo`), React Native Testing Library, ESLint, Prettier |
| Build & release | EAS Build, EAS Submit, Expo Updates (OTA) |

## Project structure

```
FUSION/
├── App.js                 # App entry
├── config.js              # Firebase initialisation
├── src/
│   ├── features/          # Feature modules: Onboarding, Main, Chats, Likes,
│   │                      # Communities, Compatibility, Profile, mealPlan,
│   │                      # ExerciseOptions, Support, Splash
│   ├── components/        # Shared UI components
│   ├── context/           # App-wide context (theme)
│   ├── infrastructure/    # Theme: typography, spacing, colours
│   ├── utilities/         # Helpers
│   └── constants.js       # Copy, option lists, subscription tiers
├── __mocks__/             # Jest mocks (AsyncStorage)
├── app.json / eas.json    # Expo + EAS configuration
└── jestSetupFile.js
```

## Run it locally

**Requirements:** Node (see `.nvmrc`), Yarn, Expo CLI, and Xcode (iOS) or Android Studio (Android).

```bash
yarn install
yarn start        # Expo dev server
yarn ios          # run on iOS simulator
yarn android      # run on Android emulator
yarn test         # Jest tests with coverage
yarn lint         # ESLint
```

## Build & release

```bash
eas build --platform ios        # or android
eas submit --platform ios       # submit the latest build to the App Store
eas update --branch production  # over-the-air update for JS-only changes
```

Bump `version` / `buildNumber` (iOS) or `versionCode` (Android) before a native build. Run `npx expo-doctor` to check the project and `npx expo install --fix` to align dependency versions with the Expo SDK.

## Status

Wiingr was published on the Apple App Store. It is currently not listed while the Apple Developer membership is inactive.

## Author

**Olu Isijola** — Front-end engineer & headless CMS architect (React, TypeScript, Next.js, Contentful). Designed and built Wiingr end to end.
[GitHub](https://github.com/isijolatosin)
