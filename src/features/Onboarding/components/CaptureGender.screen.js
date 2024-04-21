import React, { useState } from "react";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import Button from "../../../components/utility/button.component";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import HeaderComponent from "../../../components/general-component/HeaderComponent";

export default function CaptureGender({ navigation }) {
  const { height } = Dimensions.get("window");
  const [gender, setGender] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme, user },
  } = useAppContext();

  return (
    <SafeArea>
      <HorizontalPaddingSpace space={theme.space[2]}>
        <HeaderComponent
          title="Onboarding"
          theme={theme}
          textWidth="102%"
          topSpace="small"
          size="title"
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
                if (gender) {
                  user.gender = gender;
                  navigation.navigate("capture-interest-screen", { user });
                } else {
                  setPageError(true);
                }
              }}
            />
          )}
        />
        <HorizontalPaddingSpace
          space={theme.space[3]}
          style={{
            height: height,
          }}>
          <Spacer position="top" size="xxxxlarge">
            <Text
              variant="custom"
              colorType="linesLight"
              fontType="arimaMadurai"
              fontSize="h4"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              How do
            </Text>
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h4"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              you identify?
            </Text>
          </Spacer>
          <Spacer position="top" size="xxxxlarge">
            <Button
              backgroundColor={
                gender === "woman"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isNotBold={true}
              isBorder={false}
              borderColor="transparent"
              buttonFunction={() => setGender("woman")}
              text="Woman"
              textColor={
                gender === "woman"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                gender === "man"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isNotBold={true}
              isBorder={false}
              borderColor="transparent"
              buttonFunction={() => setGender("man")}
              text="Man"
              textColor={
                gender === "man"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                gender === "non-binary"
                  ? theme.colors.brand.base
                  : theme.colors.brand.highlight
              }
              isNotBold={true}
              isBorder={false}
              borderColor="transparent"
              buttonFunction={() => setGender("non-binary")}
              text="Non-Binary"
              textColor={
                gender === "non-binary"
                  ? theme.colors.brand.basewhite
                  : theme.colors.brand.black
              }
            />
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please provide your gender"
            size="body"
          />
        </HorizontalPaddingSpace>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
