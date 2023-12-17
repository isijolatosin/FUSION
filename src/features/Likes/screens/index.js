import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Likes from "../components/Likes";

const LikesStack = createNativeStackNavigator();

const LikesScreen = () => (
	<LikesStack.Navigator screenOptions={{ headerShown: false }}>
		<LikesStack.Screen
			name="LikesScreen"
			component={Likes}
			options={{ tabBarLabel: "LikesScreen" }}
		/>
	</LikesStack.Navigator>
);

export default LikesScreen;
