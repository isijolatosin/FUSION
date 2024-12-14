import React, { useState } from "react";
import { Keyboard, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import HeaderComponent from "../../../components/general-component/HeaderComponent";

export default function CaptureJobTitle({ navigation }) {
  const [jobtitleName, setJobtitle] = useState("");
  const [isVisibleOnProfile, setIsVisibleOnProfile] = useState(false);
  const {
    state: { theme },
  } = useAppContext();
  const route = useRoute();
  const { dob, _height, sexualOrientation, preference, gymGoals, workplace } =
    route.params || {};

  let jobtitle = {
    job: jobtitleName,
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
                  navigation.navigate("capture-fitness-club-screen", {
                    dob,
                    _height,
                    sexualOrientation,
                    preference,
                    gymGoals,
                    workplace,
                    jobtitle,
                  });
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
                Share your plot twist.
              </Text>
              <Text
                variant="custom"
                colorType="black"
                fontType="arimaMadurai"
                fontSize="h4"
                lineHeight={theme.lineHeights[25]}
                width="100%">
                What's your job?
              </Text>
              <Text
                variant="custom"
                colorType="lines"
                fontType="arimaMadurai"
                fontSize="caption"
                lineHeight={theme.lineHeights[3]}
                width="100%">
                Please, state that you are a student if you previously provided
                your institution name.
              </Text>
              <Text
                variant="custom"
                colorType="lines"
                fontType="arimaMadurai"
                fontSize="caption"
                lineHeight={theme.lineHeights[5]}
                width="100%">
                (Optional)
              </Text>
            </Spacer>
            <Spacer position="top" size="xxxlarge">
              <InputComponent
                includeIcon={false}
                keyboardType="text-pad"
                setValue={(text) => setJobtitle(text.toLowerCase())}
                value={jobtitleName}
                width="100%"
                isCountryCode={false}
                isBackgroundColor={false}
                placeholder="Your job title"
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
          </HorizontalPaddingSpace>
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
