import React, { Fragment } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useMontserrat,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import {
  useFonts as usePlayfairDisplay,
  PlayfairDisplay_600SemiBold,
} from "@expo-google-fonts/playfair-display";
import {
  useFonts as useArimaMadurai,
  ArimaMadurai_700Bold,
} from "@expo-google-fonts/arima-madurai";
import { createStackNavigator } from "@react-navigation/stack";

import { theme } from "./src/infrastructure/theme";
import SplashScreen from "./src/features/Splash/screen";
import { AppProvider } from "./src/context/ThemeContext";

const Stack = createStackNavigator();

export default function App() {
  const [montserratLoaded] = useMontserrat({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [platfairDisplayLoaded] = usePlayfairDisplay({
    PlayfairDisplay_600SemiBold,
  });
  const [arimaMaduraiLoaded] = useArimaMadurai({
    ArimaMadurai_700Bold,
  });

  if (!montserratLoaded || !platfairDisplayLoaded || !arimaMaduraiLoaded) {
    return null;
  }

  return (
    <Fragment>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <SplashScreen />
        </ThemeProvider>
      </AppProvider>
      <ExpoStatusBar style="dark" />
    </Fragment>
  );
}
