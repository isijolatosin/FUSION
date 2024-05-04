import React, { useState } from "react";
import { Keyboard, Pressable } from "react-native";
import { CheckBox } from "react-native-elements";
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

export default function CaptureWorkPlace({ navigation }) {
  const [workplaceName, setWorkplace] = useState("");
  const [isVisibleOnProfile, setIsVisibleOnProfile] = useState(false);
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
    whatThreeWordsDescribeYou,
  } = route.params || {};

  let workplace = {
    work: workplaceName,
    visibleOnProfile: isVisibleOnProfile,
  };

  const handleCheckboxToggle = () => {
    setIsVisibleOnProfile(!isVisibleOnProfile);
  };

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
                  if (workplaceName) {
                    navigation.navigate("capture-job-title-screen", {
                      dob,
                      _height,
                      religious,
                      sexualOrientation,
                      preference,
                      nationality,
                      whatThreeWordsDescribeYou,
                      workplace,
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
                fontSize="h4"
                lineHeight={theme.lineHeights[25]}
                width="100%">
                What do you do
              </Text>
              <Text
                variant="custom"
                colorType="black"
                fontType="arimaMadurai"
                fontSize="h4"
                lineHeight={theme.lineHeights[25]}
                width="100%">
                between 9am and 5pm?
              </Text>
              <Text
                variant="custom"
                colorType="lines"
                fontType="arimaMadurai"
                fontSize="caption"
                width="100%">
                Please, state your institution name if you are a student.
              </Text>
            </Spacer>
            <Spacer position="top" size="xxxlarge">
              <InputComponent
                includeIcon={false}
                keyboardType="default"
                setValue={(text) => setWorkplace(text.toLowerCase())}
                value={workplaceName}
                width="100%"
                isCountryCode={false}
                isBackgroundColor={false}
                placeholder="Your work place"
                fontSize={theme.fontSizes.body}
                fontType={theme.fonts.montserratLight}
              />
            </Spacer>
            <Spacer position="top" size="xxxxlarge">
              <CheckBox
                title="Visible on your profile"
                checked={isVisibleOnProfile}
                onPress={handleCheckboxToggle}
                checkedColor={theme.colors.brand.base}
                uncheckedColor={theme.colors.brand.brandFade}
                titleProps={{
                  style: {
                    fontWeight: "thin",
                    fontFamily: theme.fonts.montserratRegular,
                  },
                }}
                wrapperStyle={{
                  margin: -20,
                }}
                containerStyle={{
                  backgroundColor: theme.colors.brand.basewhite,
                  borderColor: theme.colors.brand.basewhite,
                }}
              />
            </Spacer>
            <OnboardingErrorComponent
              pageError={pageError}
              text="Please provide your work place"
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
