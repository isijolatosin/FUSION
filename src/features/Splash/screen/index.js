import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground } from "react-native";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { splashImage } from "../../../constants";

import Splash from "../components/Splash";
import Onboarding from "../components/Onboarding.screen";
import CreateAccount from "../../Onboarding/components/CreateAccount.screen";
import OtpScreen from "../../Onboarding/components/Otp.screen";
import CaptureName from "../../Onboarding/components/CaptureName.screen";
import CaptureEmail from "../../Onboarding/components/CaptureEmail.screen";
import { useAppContext } from "../../../context/ThemeContext";
import CaptureAddress from "../../Onboarding/components/CaptureAddress.screen";
import CaptureLocation from "../../Onboarding/components/CaptureLocation.screen";
import YouAreSpecial from "../../Onboarding/components/YouAreSpecial.screen";
import CaptureGenderScreen from "../../Onboarding/components/CaptureGender.screen";
import CaptureGenderInterestScreen from "../../Onboarding/components/CaptureGenderInterest.screen";
import CaptureDOBScreen from "../../Onboarding/components/CaptureDOB.screen";
import CaptureHeightScreen from "../../Onboarding/components/CaptureHeight.screen";
import CaptureReligiousScreen from "../../Onboarding/components/CaptureReligious.screen";
import CaptureCountryScreen from "../../Onboarding/components/CaptureCountry.screen";
import CaptureLookingForScreen from "../../Onboarding/components/CaptureLookingFor.screen";
import CaptureSelfDescriptionScreen from "../../Onboarding/components/CaptureSelfDescription.screen";
import CaptureWorkPlaceScreen from "../../Onboarding/components/CaptureWorkPlace.screen";
import CaptureJobTitleScreen from "../../Onboarding/components/CaptureJobTitle.screen";
import CaptureInterestsScreen from "../../Onboarding/components/CaptureInterests.screen";
import CaptureLifestyleHabitsScreen from "../../Onboarding/components/CaptureLifestyleHabits.screen";
import CapturePhotosScreen from "../../Onboarding/components/CapturePhotos.screen";
import YourProfileIsSet from "../../Onboarding/components/YourProfileIsSet.screen";
import MainScreen from "../../Main/screen";

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
        initialRouteName="splash" // change back to splash
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="splash" component={FadeOutComponent} />
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
          name="otp-screen"
          component={OtpScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-name-screen"
          component={CaptureName}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-email-screen"
          component={CaptureEmail}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-address-screen"
          component={CaptureAddress}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-location-screen"
          component={CaptureLocation}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="you-are-special-screen"
          component={YouAreSpecial}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.orange}` },
          }}
        />
        <Stack.Screen
          name="capture-gender-screen"
          component={CaptureGenderScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-interest-screen"
          component={CaptureGenderInterestScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-dob-screen"
          component={CaptureDOBScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-height-screen"
          component={CaptureHeightScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-religious-screen"
          component={CaptureReligiousScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-country-screen"
          component={CaptureCountryScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-looking-for-screen"
          component={CaptureLookingForScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-self-description-screen"
          component={CaptureSelfDescriptionScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-work-place-screen"
          component={CaptureWorkPlaceScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-job-title-screen"
          component={CaptureJobTitleScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-share-interest-screen"
          component={CaptureInterestsScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-lifestly-habits-screen"
          component={CaptureLifestyleHabitsScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="capture-photos-screen"
          component={CapturePhotosScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          }}
        />
        <Stack.Screen
          name="your-profile-is-set"
          component={YourProfileIsSet}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.orange}` },
          }}
        />
        <Stack.Screen
          name="main"
          component={MainScreen}
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
