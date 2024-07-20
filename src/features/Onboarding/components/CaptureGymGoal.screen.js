import React, { useState } from "react";
import { Keyboard, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import HeaderComponent from "../../../components/general-component/HeaderComponent";

export default function CaptureGymGoalScreen({ navigation }) {
  const [firstword, setFirstword] = useState("");
  const [secondword, setSecondword] = useState("");
  const [thirdword, setThirdword] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { dob, _height, sexualOrientation, preference } = route.params || {};

  let checkInput = false;
  let gymGoals = [];
  if (firstword && secondword && thirdword) {
    checkInput = true;
    gymGoals = [firstword, secondword, thirdword];
  }

  return (
    <SafeArea>
      <Pressable onPress={Keyboard.dismiss}>
        <HorizontalPaddingSpace space={theme.space[2]}>
          <HeaderComponent
            title="Onboarding"
            theme={theme}
            textWidth="102%"
            topSpace="small"
            LeftComp={() => (
              <IconComponent
                iconFunction={() => navigation.goBack()}
                iconName="chevron-back"
                IconComponent={Ionicons}
                size={30}
                color={theme.colors.brand.base}
              />
            )}
            RightComp={() => (
              <NextNavigation
                theme={theme}
                color={theme.colors.brand.base}
                nextFunction={() => {
                  if (checkInput) {
                    navigation.navigate("capture-work-place-screen", {
                      dob,
                      _height,
                      sexualOrientation,
                      preference,
                      gymGoals,
                    });
                  } else {
                    setPageError(true);
                  }
                }}
              />
            )}
            size="title"
          />
          <HorizontalPaddingSpace space={theme.space[3]}>
            <Spacer position="top" size="xxxxlarge">
              <Text
                variant="custom"
                colorType="lines"
                fontType="arimaMadurai"
                fontSize="h5"
                lineHeight={theme.lineHeights[25]}
                width="100%">
                Let others know
              </Text>
              <Text
                variant="custom"
                colorType="black"
                fontType="arimaMadurai"
                fontSize="h4"
                lineHeight={theme.lineHeights[25]}
                width="100%">
                your gym goals.
              </Text>
              <Text
                variant="custom"
                colorType="black"
                fontType="arimaMadurai"
                lineHeight={theme.lineHeights[0]}
                fontSize="caption"
                width="100%">
                How about you tell others three of your goals.
              </Text>
            </Spacer>
            <Spacer position="top" size="large">
              <InputComponent
                includeIcon={false}
                keyboardType="default"
                setValue={(text) => setFirstword(text.toLowerCase())}
                value={firstword}
                width="100%"
                isCountryCode={false}
                isBackgroundColor={false}
                placeholder="Goal 1:"
                fontSize={theme.fontSizes.body}
                fontType={theme.fonts.montserratLight}
              />
            </Spacer>
            <Spacer position="top" size="large">
              <InputComponent
                includeIcon={false}
                keyboardType="default"
                setValue={(text) => setSecondword(text.toLowerCase())}
                value={secondword}
                width="100%"
                isCountryCode={false}
                isBackgroundColor={false}
                placeholder="Goal 2:"
                fontSize={theme.fontSizes.body}
                fontType={theme.fonts.montserratLight}
              />
            </Spacer>
            <Spacer position="top" size="large">
              <InputComponent
                includeIcon={false}
                keyboardType="default"
                setValue={(text) => setThirdword(text.toLowerCase())}
                value={thirdword}
                width="100%"
                isCountryCode={false}
                isBackgroundColor={false}
                placeholder="Goal 3:"
                fontSize={theme.fontSizes.body}
                fontType={theme.fonts.montserratLight}
              />
            </Spacer>
            <OnboardingErrorComponent
              pageError={pageError}
              text="Please provide three words that describes you"
              size="body"
              classes={{
                textAlign: "left",
                color: theme.colors.brand.error,
                fontFamily: theme.fonts.montserratSemibold,
                fontSize: theme.spaceNumber[7],
                marginTop: theme.spaceNumberBy10[2],
              }}
            />
          </HorizontalPaddingSpace>
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
