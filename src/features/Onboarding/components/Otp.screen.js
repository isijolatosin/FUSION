import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Keyboard, Pressable } from "react-native";
import { TouchableOpacity } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Text } from "../../../components/typography/text.component";
import OTPInputComponent from "../../../components/Input-Forms/OTPInputComponent";
import { firebaseConfig } from "../../../../config";

export default function OtpScreen({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationErrorMessage, setVerificationErrorMessage] =
    useState(null);
  const [pinReady, setPinReady] = useState(false);
  const MAX_COD_LENGTH = 6;
  const {
    state: { theme },
  } = useAppContext();
  const route = useRoute();
  const { phonenumber, response } = route.params || {};

  return (
    <SafeArea>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Pressable onPress={Keyboard.dismiss}>
        <HorizontalPaddingSpace space={theme.space[5]}>
          <NavigationBar>
            <IconComponent
              iconFunction={() => navigation.navigate("create-account")}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={30}
              color={theme.colors.brand.orange}
            />
          </NavigationBar>
          <Spacer position="top" size="xxxlarge">
            <Text variant="headingSlim">Enter your verification code</Text>
            <Text variant="caption">
              sent to {phonenumber ? phonenumber : "your phone"}
            </Text>
          </Spacer>

          <Spacer position="top" size="xxxlarge">
            <OTPInputComponent
              keyboardType="number-pad"
              width="100%"
              pinReady={pinReady}
              setPinReady={setPinReady}
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              maxlength={MAX_COD_LENGTH}
              verificationId={response}
              navigation={navigation}
              phonenumber={phonenumber}
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
                navigation.navigate("create-account");
              }}>
              <Text variant="captionlight">
                {verificationErrorMessage
                  ? "Generate new OTP"
                  : "Didn't get code?"}
              </Text>
            </TouchableOpacity>
          </Spacer>
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
