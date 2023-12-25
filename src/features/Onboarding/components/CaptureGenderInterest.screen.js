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

export default function CaptureGenderInterest({ navigation }) {
  const { height } = Dimensions.get("window");
  const [genderInterest, setGenderInterest] = useState("");
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
            color={theme.colors.brand.orange}
          />
          <NextNavigation
            theme={theme}
            color={theme.colors.brand.orange}
            nextFunction={() => {
              if (genderInterest) {
                user.interest = genderInterest;
                navigation.navigate("capture-dob-screen", { user });
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
              Who are you interested in?
            </Text>
          </Spacer>
          <Spacer position="top" size="xxxxlarge">
            <Button
              backgroundColor={
                genderInterest === "women"
                  ? theme.colors.brand.orange
                  : theme.colors.brand.lightorange
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setGenderInterest("women")}
              text="Women"
              textColor={
                genderInterest === "women"
                  ? theme.colors.brand.white
                  : theme.colors.text.primary
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                genderInterest === "men"
                  ? theme.colors.brand.orange
                  : theme.colors.brand.lightorange
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setGenderInterest("men")}
              text="Men"
              textColor={
                genderInterest === "men"
                  ? theme.colors.brand.white
                  : theme.colors.text.primary
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                genderInterest === "both"
                  ? theme.colors.brand.orange
                  : theme.colors.brand.lightorange
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setGenderInterest("both")}
              text="Both"
              textColor={
                genderInterest === "both"
                  ? theme.colors.brand.white
                  : theme.colors.text.primary
              }
            />
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please provide your interest"
          />
        </HorizontalPaddingSpace>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
