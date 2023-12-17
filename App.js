import React, { Fragment } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	useFonts as useMontserrat,
	Montserrat_400Regular,
	Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import { theme } from "./src/infrastructure/theme";
import SplashScreen from "./src/features/Home/screens";
import UserProfile from "./src/features/User-profile/screens";
import LikesScreen from "./src/features/Likes/screens";
import ChatsScreen from "./src/features/Chats/screens";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
	Home: "home",
	Profile: "person",
	Likes: "heart",
	Chat: "chatbubble",
};

const createScreenOptions = ({ route }) => {
	const iconName = TAB_ICON[route.name];
	return {
		tabBarIcon: ({ color }) => {
			return route.name === "Profile" || route.name === "Chat" ? (
				<Ionicons name={iconName} size={theme.iconSizes[0]} color={color} />
			) : (
				<Entypo name={iconName} size={theme.iconSizes[0]} color={color} />
			);
		},
		tabBarActiveTintColor: `${theme.colors.brand.primary}`,
		tabBarInactiveTintColor: `${theme.colors.ui.primary}`,
		headerShown: false,
	};
};

export default function App() {
	const [montserratLoaded] = useMontserrat({
		Montserrat_400Regular,
		Montserrat_700Bold,
	});

	if (!montserratLoaded) {
		return null;
	}

	return (
		<Fragment>
			<ThemeProvider theme={theme}>
				<NavigationContainer>
					<Tab.Navigator screenOptions={createScreenOptions}>
						<Tab.Screen
							name="Home"
							component={SplashScreen}
							options={{ tabBarLabel: "Home", tabBarShowLabel: false }}
						/>
						<Tab.Screen
							name="Profile"
							component={UserProfile}
							options={{ tabBarLabel: "Profile", tabBarShowLabel: false }}
						/>
						<Tab.Screen
							name="Likes"
							component={LikesScreen}
							options={{ tabBarLabel: "Likes", tabBarShowLabel: false }}
						/>
						<Tab.Screen
							name="Chat"
							component={ChatsScreen}
							options={{ tabBarLabel: "Chat", tabBarShowLabel: false }}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</ThemeProvider>
			<ExpoStatusBar style="auto" />
		</Fragment>
	);
}
