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
import { useEffect } from "react";
import { clearDataByKey } from "../../../utilities/removeDataFromPhoneMemory";

export default function Onboarding({ navigation }) {
  useEffect(() => {
    async function clearMemory() {
      await clearDataByKey("match-id");
      await clearDataByKey("phonenumber");
      await clearDataByKey("refreshChatScreen");
      await clearDataByKey("swipe-index");
    }

    clearMemory();
  }, []);

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
            borderColor={theme.colors.brand.basewhite}
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
