import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground } from "react-native";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { splashImage } from "../../../constants";

import Splash from "../components/Splash";
import Onboarding from "../components/Onboarding.screen";
import CreateAccount from "../../Onboarding/components/CreateAccount";
import OtpPage from "../../Onboarding/components/OtpPage";
import BioPage from "../../Onboarding/components/BioPage";
import { useAppContext } from "../../../context/ThemeContext";

const Stack = createStackNavigator();

const FadeOutComponent = ({ navigation }) => {
  useEffect(() => {
    const timeOutID = setTimeout(() => {
      navigation.navigate("onBoard");
    }, 4000);

    return () => clearTimeout(timeOutID);
  }, []);

  return <Splash />;
};
const FadeInComponent = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Animation duration in milliseconds
        useNativeDriver: true,
      }),
      Animated.timing(offsetAnim, {
        toValue: 200, // Offset value in pixels
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: offsetAnim }],
      }}>
      <Onboarding navigation={navigation} />
    </Animated.View>
  );
};

const OnboardingSreencContainer = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
`;

const OnboardingScreen = ({ navigation }) => {
  const image = { uri: `${splashImage}` };

  return (
    <OnboardingSreencContainer source={image}>
      <FadeInComponent navigation={navigation} />
    </OnboardingSreencContainer>
  );
};

export default function index() {
  const {
    state: { theme },
  } = useAppContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={FadeOutComponent} />
        <Stack.Screen name="onBoard" component={OnboardingScreen} />
        <Stack.Screen
          name="create-account"
          component={CreateAccount}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="otp-page"
          component={OtpPage}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="bio-page"
          component={BioPage}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
