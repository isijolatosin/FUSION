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
  TouchableOpacity,
  Text,
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

  const LongStringWithLink = ({ longString, terms, policy }) => {
    // Function to handle link press
    const handleLinkPress = (path) => {
      navigation.navigate(path);
    };

    // Split the long string into parts
    const part1 = longString.split(terms);
    const part2 = part1[1].split(policy);

    return (
      <Text>
        {part1[0]}
        <TouchableOpacity onPress={() => handleLinkPress("terms-of-service")}>
          <Text
            style={{
              color: theme.colors.brand.lines,
              fontSize: 12,
              textDecorationLine: "underline",
              marginBottom: -theme.spaceNumber[0] + 1,
            }}>
            {terms}
          </Text>
        </TouchableOpacity>
        {part2[0]}
        <TouchableOpacity onPress={() => handleLinkPress("privacy-policy")}>
          <Text
            style={{
              color: theme.colors.brand.lines,
              fontSize: 12,
              textDecorationLine: "underline",
              marginBottom: -theme.spaceNumber[0] + 1,
            }}>
            {policy}
          </Text>
        </TouchableOpacity>
      </Text>
    );
  };

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
          <OnboardingScreenText>
            <LongStringWithLink
              longString={oboardingSummaryText}
              terms="Terms of Service"
              policy="Privacy Policy"
            />
          </OnboardingScreenText>
        </OnboardingWrapper>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
