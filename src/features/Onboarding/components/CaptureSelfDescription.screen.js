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

export default function CaptureSelfDescription({ navigation }) {
  const [firstword, setFirstword] = useState("");
  const [secondword, setSecondword] = useState("");
  const [thirdword, setThirdword] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const {
    dob,
    _height,
    religious,
    sexualOrientation,
    preference,
    nationality,
  } = route.params || {};

  let checkInput = false;
  let whatThreeWordsDescribeYou = {};
  if (firstword && secondword && thirdword) {
    checkInput = true;
    whatThreeWordsDescribeYou = {
      firstword: firstword,
      secondword: secondword,
      thirdword: thirdword,
    };
  }

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
                if (checkInput) {
                  navigation.navigate("capture-work-place-screen", {
                    dob,
                    _height,
                    religious,
                    sexualOrientation,
                    preference,
                    nationality,
                    whatThreeWordsDescribeYou,
                  });
                } else {
                  setPageError(true);
                }
              }}
            />
          </NavigationBar>
          <Spacer position="top" size="xxxxlarge">
            <Text
              variant="custom"
              colorType="black"
              fontType="playfairbold"
              fontSize="h3"
              width="100%">
              What three words describe you?
            </Text>
          </Spacer>
          <Spacer position="top" size="large">
            <InputComponent
              includeIcon={false}
              keyboardType="default"
              setValue={setFirstword}
              value={firstword}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="First word"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
          </Spacer>
          <Spacer position="top" size="large">
            <InputComponent
              includeIcon={false}
              keyboardType="default"
              setValue={setSecondword}
              value={secondword}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Second word"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
          </Spacer>
          <Spacer position="top" size="large">
            <InputComponent
              includeIcon={false}
              keyboardType="default"
              setValue={setThirdword}
              value={thirdword}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Third word"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please provide three words that describes you"
            size="caption"
          />
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
