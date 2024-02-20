import React, { useState } from "react";
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
import { Dimensions, Keyboard, Pressable } from "react-native";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import InputComponent from "../../../components/Input-Forms/InputComponent";

export default function CaptureNationality({ navigation }) {
  const { height } = Dimensions.get("window");
  const [nationality, setNationality] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { dob, _height, religious, sexualOrientation, preference } =
    route.params || {};

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
                if (nationality) {
                  navigation.navigate("capture-self-description-screen", {
                    dob,
                    _height,
                    religious,
                    sexualOrientation,
                    preference,
                    nationality,
                  });
                } else {
                  setPageError(true);
                }
              }}
            />
          </NavigationBar>
          <HorizontalPaddingSpace
            space={theme.space[3]}
            style={{
              marginTop: theme.spaceNumberBy10[9],
              height: height,
            }}>
            <Spacer position="top" size="large">
              <Text
                variant="custom"
                colorType="black"
                fontType="playfairbold"
                fontSize="h3"
                width="100%">
                What is your nationality?
              </Text>
            </Spacer>
            <OnboardingErrorComponent
              pageError={pageError}
              text="Please provide your nationality"
              size="caption"
            />
            <Spacer position="top" size="large">
              <InputComponent
                includeIcon={false}
                keyboardTyp="text-pad"
                setValue={(text) => {
                  setNationality(text);
                }}
                value={nationality}
                width="100%"
                isCountryCode={false}
                isBackgroundColor={false}
                placeholder="Type here..."
                fontSize={theme.fontSizes.body}
                fontType={theme.fonts.montserratLight}
              />
            </Spacer>
          </HorizontalPaddingSpace>
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
