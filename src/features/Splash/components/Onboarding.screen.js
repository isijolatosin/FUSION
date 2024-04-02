import React from "react";
import LottieView from "lottie-react-native";
import { Linking } from "react-native";
import { useRoute } from "@react-navigation/native";

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
  View,
  Dimensions,
} from "react-native";
import { useEffect } from "react";
import { clearDataByKey } from "../../../utilities/removeDataFromPhoneMemory";

export default function Onboarding({ navigation }) {
  const { width } = Dimensions.get("window");

  const route = useRoute();
  const { phone } = route.params || {};

  useEffect(() => {
    async function clearMemory() {
      await clearDataByKey("match-id");
      await clearDataByKey("phonenumber");
      await clearDataByKey("swipe-index");
    }

    clearMemory();
  }, []);

  const LongStringWithLink = ({ longString, terms, policy }) => {
    // Function to handle link press
    const handleLinkPress = (url) => {
      Linking.openURL(url);
    };

    // Split the long string into parts
    const part1 = longString.split(terms);
    const part2 = part1[1].split(policy);

    return (
      <Text>
        {part1[0]}
        <TouchableOpacity onPress={() => handleLinkPress("https://google.com")}>
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
        <TouchableOpacity onPress={() => handleLinkPress("https://google.com")}>
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
          <View
            style={{
              flex: 0.5,
              width: width,
              alignSelf: "center",
            }}>
            <LottieView
              source={require("../../../../assets/animations/create.json")}
              autoPlay
              loop
            />
          </View>
          <Button
            backgroundColor={theme.colors.brand.base}
            isBorder={true}
            buttonFunction={() => navigation.navigate("create-account")}
            text="Create Account"
            textColor={theme.colors.brand.basewhite}
          />
          <Button
            backgroundColor="transparent"
            isBorder={true}
            borderColor={theme.colors.brand.base}
            buttonFunction={() => {
              navigation.navigate("sign-in", { phone });
            }}
            text="Sign In"
            textColor={theme.colors.brand.base}
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
