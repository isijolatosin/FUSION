import React from "react";

import { OnboardingWrapper, OnboardingScreenText } from "./splash.styles";
import Button from "../../../components/utility/button.component";
import { theme } from "../../../infrastructure/theme";

export default function Onboarding() {
	return (
		<OnboardingWrapper>
			<Button
				text="Create Account"
				backgroundColor={theme.colors.brand.orange}
			/>
			<Button text="Sign In" backgroundColor={theme.colors.brand.primary} />
			<OnboardingScreenText>
				Lorem ipsum dolor sit amet consectetur. Volutpat eget sociis etiam
				mattis amet molestie vitae neque.
			</OnboardingScreenText>
		</OnboardingWrapper>
	);
}
