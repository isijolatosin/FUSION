import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground, Platform } from "react-native";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

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
import ProfileScreen from "../../Profile/screen";
import LikesScreen from "../../Likes/screen";
import ChatsScreen from "../../Chats/screen";
import { theme } from "../../../infrastructure/theme";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          height: Platform.OS === "ios" ? 100 : 80,
          paddingHorizontal: theme.spaceNumberBy10[0],
          paddingTop: theme.spaceNumberBy10[0],
          backgroundColor: theme.colors.brand.highlight,
          borderTopWidth: 0,
        },
        headerShown: false,
        tabBarLabel: "",
        tabBarActiveTintColor: theme.colors.brand.base,
        tabBarInactiveTintColor: theme.colors.brand.brandFade,
      })}>
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          cardStyle: { backgroundColor: `${theme.colors.brand.white}` },
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={LikesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cards-heart"
              color={color}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-sharp" color={color} size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const FadeOutComponent = ({ navigation }) => {
  useEffect(() => {
    const functionCall = async () => {
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

      return phoneValueFromPhoneMemory;
    };
    const phoneValueFromPhoneMemory = functionCall();

    const timeOutID = setTimeout(() => {
      navigation.navigate(phoneValueFromPhoneMemory ? "main" : "onBoard");
    }, 2000);

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
            cardStyle: { backgroundColor: `${theme.colors.brand.base}` },
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
            cardStyle: { backgroundColor: `${theme.colors.brand.base}` },
          }}
        />
        <Stack.Screen
          name="main"
          component={TabNavigator}
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
