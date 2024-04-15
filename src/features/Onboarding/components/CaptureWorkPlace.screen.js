import React, { useState } from "react";
import { Keyboard, Pressable } from "react-native";
import { CheckBox } from "react-native-elements";
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
          </NavigationBar>
          <Spacer position="top" size="xxxxlarge">
            <Text
              variant="custom"
              colorType="linesLight"
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
            size="caption"
          />
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
