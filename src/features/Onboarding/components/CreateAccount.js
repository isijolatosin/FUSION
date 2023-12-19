import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { SpaceArea } from "../../../components/utility/space-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import NextNavigation from "../../../components/Next-navigation";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { useAppContext } from "../../../context/ThemeContext";
import {
	InputWarraper,
	NavigationBar,
	PopupModal,
	ViewContainer,
} from "./onboarding.styles";

export default function CreateAccount({ navigation }) {
	const [isPopup, setPopup] = useState(false);
	const [phonenumber, setPhonenumber] = useState("");
	const [countryCode, setCountryCode] = useState("+0000");
	const { height } = Dimensions.get("window");
	const {
		state: { theme },
	} = useAppContext();
	let cellNumber = "";

	if (countryCode.startsWith("+"))
		if (phonenumber && countryCode) {
			cellNumber = `${countryCode} ${phonenumber}`;
		}

	return (
		<SafeArea>
			<ViewContainer>
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
							nextFunction={() =>
								cellNumber !== "" &&
								navigation.navigate("bio-page", { cellNumber })
							}
						/>
					</NavigationBar>
					<Spacer position="top" size="xxxlarge">
						<Text variant="headingSlim" width="50%">
							What's your number?
						</Text>
					</Spacer>
					<Spacer position="top" size="xlarge">
						<InputWarraper theme={theme}>
							<InputComponent
								includeIcon={false}
								setValue={setCountryCode}
								value={countryCode}
								width="25%"
							/>
							<InputComponent
								keyboardType="numeric"
								setValue={setPhonenumber}
								value={phonenumber}
								width="73%"
							/>
						</InputWarraper>
					</Spacer>
					<Spacer position="top" size="small">
						<Text variant="caption">
							We never share your details with anyone else. It’s our little
							secret. What happens if my number changes?
						</Text>
					</Spacer>
					{cellNumber.length > 12 && (
						<Spacer position="top" size="large">
							<TouchableOpacity onPress={() => setPopup(true)}>
								<Text variant="hint">Done</Text>
							</TouchableOpacity>
						</Spacer>
					)}
					{isPopup && (
						<PopupModal height={height}>
							<SpaceArea space={theme.space[6]}>
								<Text style={{ position: "relative" }} variant="popupText">
									Please note that your phone number is linked to your account
									for security and communication purposes. If you change your
									phone number, you would need to create a new account.
								</Text>
								<View style={{ position: "absolute", top: 20, right: 50 }}>
									<IconComponent
										color={theme.colors.brand.orange}
										iconFunction={() => setPopup(false)}
										iconName="close"
										IconComponent={AntDesign}
										size={30}
									/>
								</View>
							</SpaceArea>
						</PopupModal>
					)}
				</SpaceArea>
			</ViewContainer>
		</SafeArea>
	);
}
