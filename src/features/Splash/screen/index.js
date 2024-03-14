import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Entypo,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import Splash from "../components/Splash";
import Onboarding from "../components/Onboarding.screen";
import CreateAccount from "../../Onboarding/components/CreateAccount.screen";
import OtpScreen from "../../Onboarding/components/Otp.screen";
import CaptureName from "../../Onboarding/components/CaptureName.screen";
import CaptureEmail from "../../Onboarding/components/CaptureEmail.screen";
import { useAppContext } from "../../../context/ThemeContext";
import CaptureLocation from "../../Onboarding/components/CaptureLocation.screen";
import YouAreSpecial from "../../Onboarding/components/YouAreSpecial.screen";
import CaptureGenderScreen from "../../Onboarding/components/CaptureGender.screen";
import CaptureGenderInterestScreen from "../../Onboarding/components/CaptureGenderInterest.screen";
import CaptureDOBScreen from "../../Onboarding/components/CaptureDOB.screen";
import CaptureHeightScreen from "../../Onboarding/components/CaptureHeight.screen";
import CaptureReligiousScreen from "../../Onboarding/components/CaptureReligious.screen";
import CaptureNationality from "../../Onboarding/components/CaptureNationality.screen";
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
import CaptureSexualOrientation from "../../Onboarding/components/CaptureSexualOrientation.screen";
import { theme } from "../../../infrastructure/theme";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import verifyUserInDatabaseBeforeSignin from "../../../utilities/verifyUserInDatabaseBeforeSignIn";
import MessageScreen from "../../Chats/components/MessageScreen";
import SupportScreen from "../../Support";
import CompatibilityScreen from "../../Compatibility";
import CommunitiesScreen from "../../Communities";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={() => ({
        tabBarStyle: {
          height: theme.spaceNumberBy10[7],
          paddingHorizontal: theme.spaceNumber[0],
          paddingTop: theme.spaceNumberBy10[0],
          paddingBottom: theme.spaceNumberBy10[0],
          backgroundColor: theme.colors.brand.highlight,
          borderTopWidth: 1,
        },
        headerShown: false,
        gestureEnabled: false,
        tabBarLabel: "",
        tabBarActiveTintColor: theme.colors.brand.base,
        tabBarInactiveTintColor: theme.colors.brand.brandFade,
      })}>
      <Tab.Screen
        name="home"
        component={MainScreen}
        options={{
          cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={25} />
          ),
          gestureEnabled: false,
        }}
      />
      <Tab.Screen
        name="likes"
        component={LikesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cards-heart"
              color={color}
              size={25}
            />
          ),
          gestureEnabled: false,
        }}
      />
      <Tab.Screen
        name="communities"
        component={CommunitiesScreen}
        options={{
          cardStyle: {
            backgroundColor: `${theme.colors.brand.basewhite}`,
          },
          tabBarIcon: ({ color }) => (
            <FontAwesome name="group" color={color} size={20} />
          ),
          gestureEnabled: false,
        }}
      />
      <Tab.Screen
        name="chat"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-sharp" color={color} size={23} />
          ),
          gestureEnabled: false,
        }}
      />
      <Tab.Screen
        name="similar-interest"
        component={CompatibilityScreen}
        options={{
          cardStyle: {
            backgroundColor: `${theme.colors.brand.basewhite}`,
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-people" color={color} size={30} />
          ),
          gestureEnabled: false,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={23} />
          ),
          gestureEnabled: false,
        }}
      />
    </Tab.Navigator>
  );
};

const FadeOutComponent = ({ navigation }) => {
  const {
    state: { theme },
  } = useAppContext();

  useEffect(() => {
    let timeOutID = "";
    const functionCall = async () => {
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

      let verify = false;
      if (phoneValueFromPhoneMemory) {
        verify = await verifyUserInDatabaseBeforeSignin(
          phoneValueFromPhoneMemory
        );
      }

      timeOutID = setTimeout(() => {
        navigation.navigate(verify ? "main" : "onBoard");
      }, 4000);
    };
    functionCall();

    return () => clearTimeout(timeOutID);
  }, []);

  return <Splash theme={theme} />;
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
        toValue: 50, // Offset value in pixels
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

const OnboardingScreen = ({ navigation }) => {
  return <FadeInComponent navigation={navigation} />;
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
        <Stack.Screen
          name="onBoard"
          component={OnboardingScreen}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="create-account"
          component={CreateAccount}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="otp-screen"
          component={OtpScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-name-screen"
          component={CaptureName}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-email-screen"
          component={CaptureEmail}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-location-screen"
          component={CaptureLocation}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
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
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-interest-screen"
          component={CaptureGenderInterestScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-dob-screen"
          component={CaptureDOBScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-height-screen"
          component={CaptureHeightScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-religious-screen"
          component={CaptureReligiousScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-sexual-orientation-screen"
          component={CaptureSexualOrientation}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-looking-for-screen"
          component={CaptureLookingForScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-nationality-screen"
          component={CaptureNationality}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-self-description-screen"
          component={CaptureSelfDescriptionScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-work-place-screen"
          component={CaptureWorkPlaceScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-job-title-screen"
          component={CaptureJobTitleScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-share-interest-screen"
          component={CaptureInterestsScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-lifestly-habits-screen"
          component={CaptureLifestyleHabitsScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="capture-photos-screen"
          component={CapturePhotosScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        {/* <Stack.Screen
          name="capture-facial-verification-screen"
          component={CaptureFacialVerificationScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        /> */}
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
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
            gestureEnabled: true,
            gestureDirection: "horizontal",
            gestureResponseDistance: {
              horizontal: 135,
            },
          }}
        />
        <Stack.Screen
          name="message-screen"
          component={MessageScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
        <Stack.Screen
          name="support"
          component={SupportScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.basewhite}` },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
