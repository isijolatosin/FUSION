import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import { Dimensions, Keyboard, Pressable } from "react-native";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import HeaderComponent from "../../../components/general-component/HeaderComponent";

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
            )}
            size="title"
          />
          <HorizontalPaddingSpace
            space={theme.space[3]}
            style={{
              height: height,
            }}>
            <Spacer position="top" size="xxxxlarge">
              <Text
                variant="custom"
                colorType="lines"
                fontType="arimaMadurai"
                fontSize="h4"
                lineHeight={theme.lineHeights[25]}
                width="90%">
                You must have an interesting taste bud!
              </Text>
              <Text
                variant="custom"
                colorType="black"
                fontType="arimaMadurai"
                fontSize="h4"
                lineHeight={theme.lineHeights[25]}
                width="100%">
                What's your nationality?
              </Text>
            </Spacer>
            <OnboardingErrorComponent
              pageError={pageError}
              text="Please provide your nationality"
              size="body"
              classes={{
                textAlign: "left",
                color: theme.colors.brand.error,
                fontFamily: theme.fonts.montserratSemibold,
                fontSize: theme.spaceNumber[7],
                marginTop: theme.spaceNumber[2],
              }}
            />
            <Spacer position="top" size="large">
              <InputComponent
                includeIcon={false}
                keyboardType="text-pad"
                setValue={(text) => {
                  setNationality(text.toLowerCase());
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
