import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import Button from "../../../components/utility/button.component";
import { Dimensions } from "react-native";
import OnboardingErrorComponent from "./OnboardingErrorComponent";

export default function CaptureGender({ navigation }) {
  const { height } = Dimensions.get("window");
  const [gender, setGender] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme, user },
  } = useAppContext();

  return (
    <SafeArea>
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
              if (gender) {
                user.gender = gender;
                navigation.navigate("capture-interest-screen", { user });
              } else {
                setPageError(true);
              }
            }}
          />
        </NavigationBar>
        <HorizontalPaddingSpace
          space={theme.space[3]}
          style={{
            marginTop: 100,
            height: height,
          }}>
          <Spacer position="top" size="xxxxlarge">
            <Text variant="headingSlim" width="100%">
              What's your Gender?
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
          />
        </HorizontalPaddingSpace>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
