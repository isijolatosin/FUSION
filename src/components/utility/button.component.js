import React from "react";
import {
	ButtonWrapper,
	ButtonText,
} from "../../features/Splash/components/splash.styles";

export default function Button({
	backgroundColor,
	borderColor,
	buttonFunction,
	text,
	textColor,
}) {
	return (
		<ButtonWrapper
			onPress={buttonFunction}
			backgroundColor={backgroundColor}
			borderColor={borderColor}
			textColor={textColor}>
			<ButtonText textColor={textColor}>{text}</ButtonText>
		</ButtonWrapper>
	);
}
