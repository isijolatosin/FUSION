import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import Button from "../../../components/utility/button.component";
import OnboardingErrorComponent from "./OnboardingErrorComponent";

export default function CaptureLookingFor({ navigation }) {
  const { screenHeight } = Dimensions.get("window");
  const [preference, setPreference] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { dob, height, religious, country } = route.params || {};

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
              if (preference) {
                navigation.navigate("capture-self-description-screen", {
                  dob,
                  height,
                  religious,
                  country,
                  preference,
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
            marginTop: 100,
            height: screenHeight,
          }}>
          <Spacer position="top" size="xxxxlarge">
            <Text variant="headingSlim" width="100%">
              What are you looking for?
            </Text>
          </Spacer>
          <Spacer position="top" size="xxxxlarge">
            <Button
              backgroundColor={
                preference === "Friendship"
                  ? theme.colors.brand.orange
                  : theme.colors.brand.lightorange
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Friendship")}
              text="Friendship"
              textColor={
                preference === "Friendship"
                  ? theme.colors.brand.white
                  : theme.colors.text.primary
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                preference === "Life Partner"
                  ? theme.colors.brand.orange
                  : theme.colors.brand.lightorange
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Life Partner")}
              text="Life Partner"
              textColor={
                preference === "Life Partner"
                  ? theme.colors.brand.white
                  : theme.colors.text.primary
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                preference === "Casual Dating"
                  ? theme.colors.brand.orange
                  : theme.colors.brand.lightorange
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Casual Dating")}
              text="Casual Dating"
              textColor={
                preference === "Casual Dating"
                  ? theme.colors.brand.white
                  : theme.colors.text.primary
              }
            />
          </Spacer>
          <Spacer position="top" size="small">
            <Button
              backgroundColor={
                preference === "Prefer Not to Say"
                  ? theme.colors.brand.orange
                  : theme.colors.brand.lightorange
              }
              isBorder={false}
              isNotBold={true}
              borderColor="transparent"
              buttonFunction={() => setPreference("Prefer Not to Say")}
              text="Prefer Not to Say"
              textColor={
                preference === "Prefer Not to Say"
                  ? theme.colors.brand.white
                  : theme.colors.text.primary
              }
            />
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please provide what you are looking for"
          />
        </HorizontalPaddingSpace>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
