import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const ScreenWrapper = styled(View)`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-left: ${(props) => props.theme.space[3]};
	padding-right: ${(props) => props.theme.space[3]};
	animation: fadeIn 5s;
`;

const OnboardingWrapper = styled(View)`
	height: 100%;
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 auto;
`;

const LogoWrapper = styled(View)`
	background-color: ${(props) => props.theme.colors.brand.white};
	width: 200px;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 100px;
`;

const LogoText = styled(Text)`
	font-size: ${(props) => props.theme.fontSizes.h4};
	font-family: ${(props) => props.theme.fonts.bold};
`;

const ButtonWrapper = styled(TouchableOpacity)`
	background-color: ${(props) => props.theme.colors.brand.primary};
	width: 100%;
	padding-top: ${(props) => props.theme.space[3]};
	padding-bottom: ${(props) => props.theme.space[3]};
	border-radius: ${(props) => props.theme.space[3]};
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: ${(props) => props.theme.space[2]};
`;

const ButtonText = styled.Text`
	font-size: ${(props) => props.theme.fontSizes.body};
	color: ${(props) => props.theme.colors.text.primary};
	font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export {
	ScreenWrapper,
	OnboardingWrapper,
	LogoWrapper,
	LogoText,
	ButtonWrapper,
	ButtonText,
};
