import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Dimensions, ScrollView } from "react-native";

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
        </NavigationBar>
        <HorizontalPaddingSpace
          space={theme.space[3]}
          style={{
            marginTop: theme.spaceNumberBy10[1],
            height: height,
          }}>
          <Spacer position="top" size="small">
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
                buttonFunction={() => setPreference("Friendship/Networking")}
                text="Friendship/Networking"
                textColor={
                  preference === "Friendship/Networking"
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
            text="Please provide what you are looking for"
            size="caption"
          />
        </HorizontalPaddingSpace>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
