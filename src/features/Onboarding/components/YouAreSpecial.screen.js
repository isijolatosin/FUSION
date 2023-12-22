import React from "react";
import { Dimensions, Platform } from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { youarespecialmessage } from "../../../constants";
import {
  YouAreSpecialCircleText,
  YouAreSpecialCircleWrapper,
} from "./onboarding.styles";
import NextNavigation from "../../../components/Next-navigation";
import { Spacer } from "../../../components/spacer/spacer.component";

export default function YouAreSpecial({ navigation }) {
  const {
    state: { theme },
  } = useAppContext();
  const { height } = Dimensions.get("window");

  return (
    <SafeArea
      style={{
        position: "relative",
        height: `${height}px`,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <YouAreSpecialCircleWrapper>
        <YouAreSpecialCircleText>
          {youarespecialmessage}
        </YouAreSpecialCircleText>
      </YouAreSpecialCircleWrapper>
      <Spacer position="top" size="xxxlarge">
        <NextNavigation
          theme={theme}
          size={theme.sizes[3]}
          color={theme.colors.brand.white}
          nextFunction={() => navigation.navigate("capture-gender-screen")}
        />
      </Spacer>
      <YouAreSpecialCircleWrapper
        style={{
          position: "absolute",
          top: Platform.OS === "ios" ? -150 : -190,
          left: -150,
        }}
      />
      <YouAreSpecialCircleWrapper
        style={{
          position: "absolute",
          bottom: Platform.OS === "ios" ? -150 : -190,
          right: -150,
        }}
      />
    </SafeArea>
  );
}
