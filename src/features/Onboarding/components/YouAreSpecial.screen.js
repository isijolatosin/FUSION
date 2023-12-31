import React, { useEffect } from "react";
import { Dimensions, Platform } from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { youarespecialmessage } from "../../../constants";
import {
  YouAreSpecialCircleText,
  YouAreSpecialCircleWrapper,
} from "./onboarding.styles";

export default function YouAreSpecial({ navigation }) {
  const { height } = Dimensions.get("window");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate("capture-gender-screen");
    }, 5000);

    return () => clearImmediate(timeoutId);
  }, []);

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
