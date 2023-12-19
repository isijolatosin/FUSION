import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { Spacer } from "../../../components/spacer/spacer.component";
import NextNavigation from "../../../components/Next-navigation";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SpaceArea } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Text } from "../../../components/typography/text.component";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import CodeComponent from "../../../components/Input-Forms/CodeComponent";

export default function BioPage({ navigation }) {
	const [verificationCode, setCode] = useState("");
	const {
		state: { theme },
	} = useAppContext();
	const route = useRoute();
	const { cellNumber } = route.params || {};

	return (
		<SafeArea>
			<SpaceArea space={theme.space[5]}>
				<NavigationBar>
					<IconComponent
						iconFunction={() => navigation.goBack()}
						iconName="chevron-back"
						IconComponent={Ionicons}
						size={30}
						color={theme.colors.brand.orange}
					/>
					<NextNavigation
						theme={theme}
						color={theme.colors.brand.orange}
						nextFunction={() => {}}
					/>
				</NavigationBar>
				<Spacer position="top" size="xxxlarge">
					<Text variant="headingSlim">Enter your verification code</Text>
					<Text variant="caption">sent to {cellNumber}</Text>
				</Spacer>

				<Spacer position="top" size="xxxlarge">
					<CodeComponent
						keyboardType="numeric"
						setValue={setCode}
						value={verificationCode}
						width="100%"
					/>
				</Spacer>
				<Spacer position="top" size="xxlarge">
					<Text variant="captionlight">Didn't get code?</Text>
				</Spacer>
			</SpaceArea>
		</SafeArea>
	);
}
