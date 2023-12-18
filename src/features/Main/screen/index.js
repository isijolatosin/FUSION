import React from "react";
import { Ionicons, Entypo, Foundation } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../../Home/screens/";
import UserProfile from "../../User-profile/screens/";
import LikesScreen from "../../Likes/screens/";
import ChatsScreen from "../../Chats/screens/";
import { theme } from "../../../infrastructure/theme";

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
			if (route.name === "Profile" || route.name === "Chat") {
				return (
					<Ionicons name={iconName} size={theme.iconSizes[0]} color={color} />
				);
			}

			if (route.name === "Likes") {
				return (
					<Foundation name={iconName} size={theme.iconSizes[0]} color={color} />
				);
			}

			return <Entypo name={iconName} size={theme.iconSizes[0]} color={color} />;
		},
		tabBarActiveTintColor: `${theme.colors.brand.orange}`,
		tabBarInactiveTintColor: `${theme.colors.text.primary}`,
		headerShown: false,
	};
};

const Index = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator screenOptions={createScreenOptions}>
				<Tab.Screen
					name="Home"
					component={Home}
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
	);
};

export default Index;
