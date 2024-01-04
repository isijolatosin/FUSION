import React from "react";

import { OnboardingWrapper, OnboardingScreenText } from "./splash.styles";
import Button from "../../../components/utility/button.component";
import { theme } from "../../../infrastructure/theme";
import { oboardingSummaryText } from "../../../constants";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

export default function Onboarding({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Pressable onPress={Keyboard.dismiss}>
        <OnboardingWrapper>
          <Button
            backgroundColor={theme.colors.brand.base}
            isBorder={false}
            buttonFunction={() => navigation.navigate("create-account")}
            text="Create Account"
            textColor={theme.colors.brand.basewhite}
          />
          <Button
            backgroundColor="transparent"
            isBorder={true}
            borderColor={theme.colors.brand.white}
            buttonFunction={() => {
              navigation.navigate("create-account");
            }}
            text="Sign In"
            textColor={theme.colors.brand.basewhite}
          />
          <OnboardingScreenText>{oboardingSummaryText}</OnboardingScreenText>
        </OnboardingWrapper>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
