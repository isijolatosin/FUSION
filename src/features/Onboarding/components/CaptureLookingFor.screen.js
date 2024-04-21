import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Dimensions, ScrollView } from "react-native";

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

export default function CaptureLookingFor({ navigation }) {
  const { height } = Dimensions.get("window");
  const [preference, setPreference] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { dob, _height, religious, sexualOrientation } = route.params || {};

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
                if (preference) {
                  navigation.navigate("capture-nationality-screen", {
                    dob,
                    _height,
                    religious,
                    sexualOrientation,
                    preference,
                  });
                } else {
                  setPageError(true);
                }
              }}
            />
          )}
        />
        <HorizontalPaddingSpace space={theme.space[3]}>
          <Spacer position="top" size="xxxxlarge">
            <Text
              variant="custom"
              colorType="linesLight"
              fontType="arimaMadurai"
              fontSize="h4"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              What are you
            </Text>
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h4"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              currently hoping for?
            </Text>
          </Spacer>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={
                  preference === "Friendship/Networking"
                    ? theme.colors.brand.base
                    : theme.colors.brand.highlight
                }
                isBorder={false}
                isNotBold={true}
                borderColor="transparent"
                buttonFunction={() => setPreference("Friendship")}
                text="Friendship/Networking"
                textColor={
                  preference === "Friendship"
                    ? theme.colors.brand.basewhite
                    : theme.colors.brand.black
                }
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={
                  preference === "Life Partner"
                    ? theme.colors.brand.base
                    : theme.colors.brand.highlight
                }
                isBorder={false}
                isNotBold={true}
                borderColor="transparent"
                buttonFunction={() => setPreference("Life Partner")}
                text="Life Partner"
                textColor={
                  preference === "Life Partner"
                    ? theme.colors.brand.basewhite
                    : theme.colors.brand.black
                }
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={
                  preference === "Casual Dating"
                    ? theme.colors.brand.base
                    : theme.colors.brand.highlight
                }
                isBorder={false}
                isNotBold={true}
                borderColor="transparent"
                buttonFunction={() => setPreference("Casual Dating")}
                text="Casual Dating"
                textColor={
                  preference === "Casual Dating"
                    ? theme.colors.brand.basewhite
                    : theme.colors.brand.black
                }
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={
                  preference === "Don't know yet"
                    ? theme.colors.brand.base
                    : theme.colors.brand.highlight
                }
                isBorder={false}
                isNotBold={true}
                borderColor="transparent"
                buttonFunction={() => setPreference("Don't know yet")}
                text="Don't know yet"
                textColor={
                  preference === "Don't know yet"
                    ? theme.colors.brand.basewhite
                    : theme.colors.brand.black
                }
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={
                  preference === "Prefer Not to Say"
                    ? theme.colors.brand.base
                    : theme.colors.brand.highlight
                }
                isBorder={false}
                isNotBold={true}
                borderColor="transparent"
                buttonFunction={() => setPreference("Prefer Not to Say")}
                text="Prefer Not to Say"
                textColor={
                  preference === "Prefer Not to Say"
                    ? theme.colors.brand.basewhite
                    : theme.colors.brand.black
                }
              />
            </Spacer>
          </ScrollView>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please provide what you are hoping for"
            size="body"
          />
        </HorizontalPaddingSpace>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
