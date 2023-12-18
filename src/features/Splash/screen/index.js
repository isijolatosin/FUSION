import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground } from "react-native";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { splashImage } from "../../../constants";

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
			<Onboarding />
		</Animated.View>
	);
};

const OnboardingSreencContainer = styled(ImageBackground)`
	flex: 1;
	justify-content: center;
`;

const BackgroundImageScreen = ({ route }) => {
	const { backgroundImage } = route.params;
	const image = { uri: `${backgroundImage}` };

	return (
		<OnboardingSreencContainer source={image}>
			<FadeInComponent />
		</OnboardingSreencContainer>
	);
};

export default function index() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Splash"
				screenOptions={{
					headerShown: false,
				}}>
				<Stack.Screen name="Splash" component={FadeOutComponent} />
				<Stack.Screen
					name="onBoard"
					component={BackgroundImageScreen}
					initialParams={{
						backgroundImage: splashImage,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
