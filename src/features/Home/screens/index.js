import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home";

const HomeStack = createNativeStackNavigator();

const SplashScreen = () => (
	<HomeStack.Navigator screenOptions={{ headerShown: false }}>
		<HomeStack.Screen
			name="HomeScreen"
			component={Home}
			options={{ tabBarLabel: "HomeScreen" }}
		/>
	</HomeStack.Navigator>
);

export default SplashScreen;
