import React from "react";

import { OnboardingWrapper, OnboardingScreenText } from "./splash.styles";
import Button from "../../../components/utility/button.component";
import { theme } from "../../../infrastructure/theme";
import { oboardingSummaryText } from "../../../constants";

export default function Onboarding({ navigation }) {
	return (
		<OnboardingWrapper>
			<Button
				backgroundColor={theme.colors.brand.orange}
				buttonFunction={() => navigation.navigate("create-account")}
				text="Create Account"
				textColor={theme.colors.brand.white}
			/>
			<Button
				backgroundColor="transparent"
				borderColor={theme.colors.brand.primary}
				text="Sign In"
				textColor={theme.colors.brand.white}
			/>
			<OnboardingScreenText>{oboardingSummaryText}</OnboardingScreenText>
		</OnboardingWrapper>
	);
}
