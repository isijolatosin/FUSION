import React, { Fragment } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useMontserrat,
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import {
  useFonts as usePlayfairDisplay,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { theme } from "./src/infrastructure/theme";
import SplashScreen from "./src/features/Splash/screen";
import Main from "./src/features/Main/screen";
import { AppProvider } from "./src/context/ThemeContext";

const Stack = createStackNavigator();

export default function App() {
  const [montserratLoaded] = useMontserrat({
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [platfairDisplayLoaded] = usePlayfairDisplay({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
  });

  if (!montserratLoaded || !platfairDisplayLoaded) {
    return null;
  }

  const userObject = {
    // name: "tosin",
    // age: 30,
  };

  return (
    <Fragment>
      <AppProvider>
        <ThemeProvider theme={theme}>
          {userObject["age"] ? (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Main"
                  component={Main}
                  screenOptions={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          ) : (
            <>
              <SplashScreen />
            </>
          )}
        </ThemeProvider>
      </AppProvider>
      <ExpoStatusBar style="dark" />
    </Fragment>
  );
}
