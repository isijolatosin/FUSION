import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "../components/User";

const UserStack = createNativeStackNavigator();

const UserScreen = () => (
	<UserStack.Navigator screenOptions={{ headerShown: false }}>
		<UserStack.Screen
			name="UserScreen"
			component={UserProfile}
			options={{ tabBarLabel: "UserScreen" }}
		/>
	</UserStack.Navigator>
);

export default UserScreen;
