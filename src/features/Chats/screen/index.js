import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsScreen from "../components/ChatsScreen";

const ChatStack = createNativeStackNavigator();

const ChatScreen = () => <ChatsScreen />;

export default ChatScreen;
