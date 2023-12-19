import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const NextNavigationText = styled.Text`
	color: ${(props) => props.color};
	font-family: ${(props) => props.theme.fonts.regular};
`;

const NextNavigationWrapper = styled(TouchableOpacity)``;

export default function NextNavigation({ theme, color, nextFunction }) {
	return (
		<NextNavigationWrapper onPress={nextFunction}>
			<NextNavigationText color={color}>Next</NextNavigationText>
		</NextNavigationWrapper>
	);
}
