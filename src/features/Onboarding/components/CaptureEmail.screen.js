import React, { useState } from "react";
import { Keyboard, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import OnboardingErrorComponent from "./OnboardingErrorComponent";

export default function CaptureEmail({ navigation }) {
  const [email, setEmail] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();
  const route = useRoute();
  const { user } = route.params || {};

  return (
    <SafeArea>
      <Pressable onPress={Keyboard.dismiss}>
        <HorizontalPaddingSpace space={theme.space[5]}>
          <NavigationBar>
            <IconComponent
              iconFunction={() => navigation.goBack()}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={30}
              color={theme.colors.brand.base}
            />
            <NextNavigation
              theme={theme}
              color={theme.colors.brand.base}
              nextFunction={() => {
                if (email) {
                  user.email = email;
                  navigation.navigate("capture-address-screen", { user });
                } else {
                  setPageError(true);
                }
              }}
            />
          </NavigationBar>
          <Spacer position="top" size="xxxxlarge">
            <Text
              variant="title"
              colorType="black"
              fontType="playfairbold"
              fontSize="h4"
              width="100%">
              What's your email?
            </Text>
          </Spacer>
          <Spacer position="top" size="large">
            <InputComponent
              includeIcon={false}
              keyboardType="email-address"
              setValue={setEmail}
              value={email}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Enter Email"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please provide your email"
          />
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
