import React, { useEffect, useRef, useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { OnboardingWrapper, OnboardingScreenText } from "./splash.styles";
import Button from "../../../components/utility/button.component";
import { theme } from "../../../infrastructure/theme";
import { oboardingSummaryText } from "../../../constants";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import { sendVerification } from "../../../utilities/verification";
import { firebaseConfig } from "../../../../config";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { InputWarraper } from "../../Onboarding/components/onboarding.styles";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";

export default function Onboarding({ navigation }) {
  const [phonenumber, setPhonenumber] = useState("");
  const [phoneNumberFromPhoneMemory, setPhoneNumberFromPhoneMemory] =
    useState("");
  const [countryCode, setCountryCode] = useState("");
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    const functionCall = async () => {
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

      if (phoneValueFromPhoneMemory) {
        setPhoneNumberFromPhoneMemory(phoneValueFromPhoneMemory);
      }
    };
    functionCall();
  }, []);

  let cellNumber = "";
  let phonenumberPlusCountryCode = "";

  if (phonenumber && countryCode) {
    cellNumber = `${countryCode}${phonenumber}`;
    phonenumberPlusCountryCode = `+${countryCode}${phonenumber}`;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ paddingBottom: cellNumber.length > 10 ? 85 : 0 }}>
      <Pressable onPress={Keyboard.dismiss}>
        <OnboardingWrapper>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          <Button
            backgroundColor={theme.colors.brand.base}
            isBorder={false}
            buttonFunction={() => navigation.navigate("create-account")}
            text="Create Account"
            textColor={theme.colors.brand.basewhite}
          />

          {phoneNumberFromPhoneMemory ? (
            <Button
              backgroundColor="transparent"
              isBorder={true}
              borderColor={theme.colors.brand.white}
              buttonFunction={() => {
                sendVerification(
                  phoneNumberFromPhoneMemory,
                  recaptchaVerifier,
                  () => {},
                  () => {},
                  navigation,
                  true
                );
              }}
              text="Sign In"
              textColor={theme.colors.brand.basewhite}
            />
          ) : (
            <>
              <Spacer position="bottom" size="xsmall">
                <Text
                  style={{ marginTop: 20 }}
                  variant="subHeading"
                  fontType="montserratSemibold"
                  colorType="white"
                  fontSize="body">
                  Please provide your phone number
                </Text>
              </Spacer>
              <Spacer position="bottom" size="small">
                <InputWarraper theme={theme}>
                  <InputComponent
                    keyboardType="number-pad"
                    includeIcon={false}
                    setValue={setCountryCode}
                    value={countryCode}
                    width="25%"
                    isCountryCode={true}
                    isBackgroundColor={true}
                    placeholder="123"
                  />
                  <InputComponent
                    keyboardType="number-pad"
                    includeIcon={false}
                    setValue={setPhonenumber}
                    value={phonenumber}
                    width="73%"
                    isCountryCode={false}
                    isBackgroundColor={true}
                  />
                </InputWarraper>
              </Spacer>
              {cellNumber.length > 10 && (
                <Button
                  backgroundColor="transparent"
                  isBorder={true}
                  borderColor={theme.colors.brand.white}
                  buttonFunction={() => {
                    storeData("phonenumber", phonenumberPlusCountryCode);

                    sendVerification(
                      phonenumberPlusCountryCode,
                      recaptchaVerifier,
                      setPhonenumber,
                      setCountryCode,
                      navigation,
                      true
                    );
                  }}
                  text="Sign In"
                  textColor={theme.colors.brand.basewhite}
                />
              )}
            </>
          )}
          <OnboardingScreenText>{oboardingSummaryText}</OnboardingScreenText>
        </OnboardingWrapper>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
