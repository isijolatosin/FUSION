import React, { useEffect, useRef } from "react";
import { Dimensions, Platform } from "react-native";
import { useRoute } from "@react-navigation/native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { yourprofileisset } from "../../../constants";
import {
  YouAreSpecialCircleText,
  YouAreSpecialCircleWrapper,
} from "./onboarding.styles";
import { sendVerification } from "../../../utilities/verification";
import { firebaseConfig } from "../../../../config";

export default function YourProfileIsSet({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const { height } = Dimensions.get("window");

  const route = useRoute();
  const { phonenumber } = route.params || {};

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate("main", { phonenumber });
    }, 2500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <SafeArea
      style={{
        position: "relative",
        height: height,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <YouAreSpecialCircleWrapper>
        <YouAreSpecialCircleText>{yourprofileisset}</YouAreSpecialCircleText>
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
