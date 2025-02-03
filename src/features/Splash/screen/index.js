import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import Splash from "../components/Splash";
import Onboarding from "../components/Onboarding.screen";
import CreateAccount from "../../Onboarding/components/CreateAccount.screen";
import OtpScreen from "../../Onboarding/components/Otp.screen";
import CaptureName from "../../Onboarding/components/CaptureName.screen";
import { useAppContext } from "../../../context/ThemeContext";
import CaptureLocation from "../../Onboarding/components/CaptureLocation.screen";
import YouAreSpecial from "../../Onboarding/components/YouAreSpecial.screen";
import CaptureGenderScreen from "../../Onboarding/components/CaptureGender.screen";
import CaptureGenderInterestScreen from "../../Onboarding/components/CaptureGenderInterest.screen";
import CaptureDOBScreen from "../../Onboarding/components/CaptureDOB.screen";
import CaptureHeightScreen from "../../Onboarding/components/CaptureHeight.screen";
import CaptureLookingForScreen from "../../Onboarding/components/CaptureLookingFor.screen";
import CaptureGymGoalScreen from "../../Onboarding/components/CaptureGymGoal.screen";
import CaptureWorkPlaceScreen from "../../Onboarding/components/CaptureWorkPlace.screen";
import CaptureJobTitleScreen from "../../Onboarding/components/CaptureJobTitle.screen";
import CaptureInterestsScreen from "../../Onboarding/components/CaptureInterests.screen";
import CaptureFitnessClubScreen from "../../Onboarding/components/CaptureFitnessClub.screen";
import CaptureLifestyleHabitsScreen from "../../Onboarding/components/CaptureLifestyleHabits.screen";
import CapturePhotosScreen from "../../Onboarding/components/CapturePhotos.screen";
import YourProfileIsSet from "../../Onboarding/components/YourProfileIsSet.screen";
import MainScreen from "../../Main/screen";
import ProfileScreen from "../../Profile/screen";
import MealPlanScreen from "../../mealPlan/screen";
import ExerciseScreen from "../../ExerciseOptions/screen";
import ChatsScreen from "../../Chats/screen";
import CaptureSexualOrientation from "../../Onboarding/components/CaptureSexualOrientation.screen";
import { theme } from "../../../infrastructure/theme";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import verifyUserInDatabaseBeforeSignin from "../../../utilities/verifyUserInDatabaseBeforeSignIn";
import MessageScreen from "../../Chats/components/MessageScreen";
import SupportScreen from "../../Support";
import SignIn from "../../Onboarding/components/SignIn.screen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
  const TAB_LIST = [
    {
      component: MealPlanScreen,
      Icon: MaterialCommunityIcons,
      name: "meal-plan",
      iconName: "food-outline",
      size: 25,
    },
    {
      component: ExerciseScreen,
      Icon: MaterialCommunityIcons,
      name: "exercise",
      iconName: "weight-lifter",
      size: 25,
    },
    {
      component: ProfileScreen,
      Icon: Ionicons,
      name: "profile",
      iconName: "person-outline",
      size: 23,
    },
    {
      component: ChatsScreen,
      Icon: Ionicons,
      name: "chat",
      iconName: "chatbubble-outline",
      size: 25,
    },
    {
      component: MainScreen,
      Icon: FontAwesome5,
      name: "swipe",
      iconName: "running",
      size: 25,
    },
  ];
  return (
    <Tab.Navigator
      initialRouteName={route?.params?.lastScreenVisited}
      screenOptions={() => ({
        tabBarStyle: {
          display: "flex",
          alignItems: "center",
          height: theme.spaceNumberBy10[7],
          paddingLeft: theme.spaceNumber[0],
          paddingTop: theme.spaceNumberBy10[0],
          paddingBottom: theme.spaceNumberBy10[0],
          backgroundColor: theme.colors.brand.base,
        },
        headerShown: false,
        gestureEnabled: false,
        tabBarLabel: "",
        tabBarActiveTintColor: theme.colors.brand.base1,
        // tabBarInactiveTintColor: theme.colors.brand.black,
      })}>
      {TAB_LIST.map((list, index) => (
        <Tab.Screen
          key={index}
          name={list.name}
          component={list.component}
          options={{
            cardStyle: {
              backgroundColor: `${theme.colors.brand.error}`,
            },
            tabBarIcon: (
              { focused } // there is color props option here
            ) => (
              <View
                style={{
                  width: theme.spaceNumberBy10[4],
                  height: theme.spaceNumberBy10[4],
                  borderRadius: theme.spaceNumberBy10[2],
                  backgroundColor:
                    focused &&
                    (list.name === "swipe"
                      ? "rgba(13, 148, 136, 0.2)"
                      : theme.colors.brand.tealLight),
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <list.Icon
                  name={list.iconName}
                  color={
                    focused
                      ? list.name === "swipe"
                        ? "#0d9488"
                        : theme.colors.brand.teal
                      : list.name === "swipe"
                      ? "#0d9488"
                      : theme.colors.brand.base1
                  }
                  size={list.size}
                />
              </View>
            ),
            gestureEnabled: false,
          }}
        />
      ))}
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

      return () => clearTimeout(timeOutID);
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
        toValue: 10, // Offset value in pixels
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
  const [rendered, setRendered] = useState(false);
  const [lastScreenVisited, setLastScreenVisited] = useState("");

  useEffect(() => {
    (async function getLastScreenVisit() {
      const lastScreenFromMemory = await retrieveData("last-screen-visit");
      setLastScreenVisited(lastScreenFromMemory);
    })();

    const delayRender = setTimeout(() => {
      setRendered(true);
    }, 50);
    return () => clearTimeout(delayRender);
  }, []);

  if (!rendered) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={lastScreenVisited ? "main" : "splash"}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="splash" component={FadeOutComponent} />
        <Stack.Screen
          name="onBoard"
          component={OnboardingScreen}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="create-account"
          component={CreateAccount}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="sign-in"
          component={SignIn}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="otp-screen"
          component={OtpScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-name-screen"
          component={CaptureName}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-location-screen"
          component={CaptureLocation}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
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
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-interest-screen"
          component={CaptureGenderInterestScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-dob-screen"
          component={CaptureDOBScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-height-screen"
          component={CaptureHeightScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-sexual-orientation-screen"
          component={CaptureSexualOrientation}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-looking-for-screen"
          component={CaptureLookingForScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-gym-goal-screen"
          component={CaptureGymGoalScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-work-place-screen"
          component={CaptureWorkPlaceScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-job-title-screen"
          component={CaptureJobTitleScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-fitness-club-screen"
          component={CaptureFitnessClubScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-share-interest-screen"
          component={CaptureInterestsScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-lifestly-habits-screen"
          component={CaptureLifestyleHabitsScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
          }}
        />
        <Stack.Screen
          name="capture-photos-screen"
          component={CapturePhotosScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base1}` },
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
          initialParams={{ lastScreenVisited }}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base}` },
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
            cardStyle: { backgroundColor: `${theme.colors.brand.base}` },
          }}
        />
        <Stack.Screen
          name="support"
          component={SupportScreen}
          screenOptions={{
            headerShown: false,
          }}
          options={{
            cardStyle: { backgroundColor: `${theme.colors.brand.base}` },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
