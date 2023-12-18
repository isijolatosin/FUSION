import React, { Fragment, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Splash from "../components/Splash";
import Onboarding from "../components/Onboarding.screen";

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
const FadeInComponent = () => {
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
				toValue: 0, // Offset value in pixels
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
			<Onboarding />
		</Animated.View>
	);
};

export default function index() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Splash"
				screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Splash" component={FadeOutComponent} />
				<Stack.Screen name="onBoard" component={FadeInComponent} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
