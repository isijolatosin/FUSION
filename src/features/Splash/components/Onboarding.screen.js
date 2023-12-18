import React from "react";

import { OnboardingWrapper } from "./splash.styles";
import { Text } from "react-native";
import Button from "../../../components/utility/button.component";

export default function Onboarding() {
	return (
		<OnboardingWrapper>
			<Button text="Create Account" />
			<Button text="Sign In" />
			<Text>
				Lorem ipsum dolor sit amet consectetur. Volutpat eget sociis etiam
				mattis amet molestie vitae neque.
			</Text>
		</OnboardingWrapper>
	);
}
