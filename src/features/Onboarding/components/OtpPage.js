import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Keyboard, Pressable } from "react-native";
import { TouchableOpacity } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { Spacer } from "../../../components/spacer/spacer.component";
import NextNavigation from "../../../components/Next-navigation";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SpaceArea } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Text } from "../../../components/typography/text.component";
import OTPInputComponent from "../../../components/Input-Forms/OTPInputComponent";
import { sendVerification } from "../../../utilities/verification";
import { firebaseConfig } from "../../../../config";

export default function OtpPage({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [verificationIdOnOTP, setVerificationId] = useState(null);
  const [verificationCode, setCode] = useState("");
  const [verificationErrorMessage, setVerificationErrorMessage] =
    useState(null);
  const [pinReady, setPinReady] = useState(false);
  const MAX_COD_LENGTH = 6;
  const {
    state: { theme },
  } = useAppContext();
  const route = useRoute();
  const { phonenumberPlusCountryCode, verificationId } = route.params || {};

  const verification_Id = verificationId ?? verificationIdOnOTP;

  return (
    <SafeArea>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Pressable onPress={Keyboard.dismiss}>
        <SpaceArea space={theme.space[5]}>
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
              nextFunction={() => {}}
            />
          </NavigationBar>
          <Spacer position="top" size="xxxlarge">
            <Text variant="headingSlim">Enter your verification code</Text>
            <Text variant="caption">
              sent to{" "}
              {phonenumberPlusCountryCode
                ? phonenumberPlusCountryCode
                : "your phone"}
            </Text>
          </Spacer>

          <Spacer position="top" size="xxxlarge">
            <OTPInputComponent
              keyboardType="number-pad"
              width="100%"
              setPinReady={setPinReady}
              code={verificationCode}
              setCode={setCode}
              maxlength={MAX_COD_LENGTH}
              verificationId={verification_Id}
              navigation={navigation}
              phonenumberPlusCountryCode={phonenumberPlusCountryCode}
              setVerificationErrorMessage={setVerificationErrorMessage}
            />
          </Spacer>
          {verificationErrorMessage && (
            <Spacer position="top" size="large">
              <Text variant="error">Error: Please regenerate OTP</Text>
            </Spacer>
          )}
          <Spacer position="top" size="xxlarge">
            <TouchableOpacity
              onPress={() => {
                sendVerification(
                  phonenumberPlusCountryCode,
                  recaptchaVerifier,
                  setVerificationId,
                  () => {},
                  () => {}
                );
              }}>
              <Text variant="captionlight">
                {verificationErrorMessage
                  ? "Generate new OTP"
                  : "Didn't get code?"}
              </Text>
            </TouchableOpacity>
          </Spacer>
        </SpaceArea>
      </Pressable>
    </SafeArea>
  );
}
