import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsScreen from "../components/ChatsScreen";

const ChatStack = createNativeStackNavigator();

const ChatScreen = () => (
	<ChatStack.Navigator screenOptions={{ headerShown: false }}>
		<ChatStack.Screen
			name="ChatScreen"
			component={ChatsScreen}
			options={{ tabBarLabel: "ChatScreen" }}
		/>
	</ChatStack.Navigator>
);

export default ChatScreen;
