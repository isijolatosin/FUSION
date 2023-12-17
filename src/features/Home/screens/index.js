import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeSplash from "../components/HomeSplash";

const HomeStack = createNativeStackNavigator();

const SplashScreen = () => (
	<HomeStack.Navigator screenOptions={{ headerShown: false }}>
		<HomeStack.Screen
			name="HomeScreen"
			component={HomeSplash}
			options={{ tabBarLabel: "HomeScreen" }}
		/>
	</HomeStack.Navigator>
);

export default SplashScreen;
