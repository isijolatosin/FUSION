import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
	ButtonWrapper,
	ButtonText,
} from "../../features/Splash/components/splash.styles";

export default function Button({ text }) {
	return (
		<ButtonWrapper>
			<ButtonText>{text}</ButtonText>
		</ButtonWrapper>
	);
}
