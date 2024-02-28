import React, { useState, useRef } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Dimensions, Keyboard, Pressable, View } from "react-native";

import { firebaseConfig } from "../../../../config";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { sendVerification } from "../../../utilities/verification";
import {
  InputWarraper,
  NavigationBar,
  PopupModal,
  ViewContainer,
} from "./onboarding.styles";
import {
  createAccountInstruction,
  phonenumberCaptionInstruction,
} from "../../../constants";

export default function CreateAccount({ navigation }) {
  const [isPopup, setPopup] = useState(false);
  const [phonenumber, setPhonenumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const recaptchaVerifier = useRef(null);
  const { height } = Dimensions.get("window");
  const {
    state: { theme },
  } = useAppContext();
  let cellNumber = "";
  let phonenumberPlusCountryCode = "";

  if (phonenumber && countryCode) {
    cellNumber = `${countryCode}${phonenumber}`;
    phonenumberPlusCountryCode = `+${countryCode}${phonenumber}`;
  }

  return (
    <SafeArea>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Pressable onPress={Keyboard.dismiss}>
        <ViewContainer>
          <HorizontalPaddingSpace space={theme.space[5]}>
            <NavigationBar>
              <IconComponent
                iconFunction={() => navigation.goBack()}
                iconName="chevron-back"
                IconComponent={Ionicons}
                size={30}
                color={theme.colors.brand.base}
              />
            </NavigationBar>
            <Spacer position="top" size="xxxlarge">
              <Text
                variant="custom"
                colorType="black"
                fontType="arimaMadurai"
                fontSize="h3"
                width="50%">
                What's your number?
              </Text>
            </Spacer>
            <Spacer position="top" size="xlarge">
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
            <Spacer position="top" size="small">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratRegular"
                fontSize="caption">
                {createAccountInstruction}
              </Text>
            </Spacer>
            {cellNumber.length > 10 && (
              <Spacer
                position="top"
                size="xxxxlarge"
                style={{
                  // flexDirection: "row",
                  alignItems: "center",
                }}>
                <Spacer position="top" size="xxxxlarge">
                  <Pressable
                    style={{
                      paddingVertical: theme.spaceNumber[1],
                      paddingHorizontal: theme.spaceNumber[4],
                      borderRadius: theme.spaceNumber[1],
                      borderStyle: "dashed",
                      borderWidth: 1,
                      borderColor: theme.colors.brand.lines,
                    }}
                    onPress={() => {
                      setPopup(true);
                    }}>
                    <Text
                      style={{ textAlign: "center" }}
                      variant="custom"
                      colorType="lines"
                      fontType="montserratBold"
                      fontSize="body">
                      Click to Verify Number
                    </Text>
                  </Pressable>
                </Spacer>
              </Spacer>
            )}
            {isPopup && (
              <PopupModal height={height}>
                <HorizontalPaddingSpace
                  space={theme.space[7]}
                  style={{
                    position: "relative",
                    width: "100%",
                    marginTop: -theme.spaceNumberBy50[2],
                  }}>
                  <Text variant="popupText">
                    {phonenumberCaptionInstruction}
                  </Text>
                  <View
                    style={{
                      position: "absolute",
                      top: theme.spaceNumberBy10[0],
                      right: theme.spaceNumberBy10[4],
                    }}>
                    <IconComponent
                      color={theme.colors.brand.base}
                      iconFunction={() => setPopup(false)}
                      iconName="close"
                      IconComponent={AntDesign}
                      size={theme.spaceNumberBy10[1]}
                    />
                  </View>
                  <View style={{ position: "absolute", bottom: 18, left: 58 }}>
                    {cellNumber.length > 10 && (
                      <Spacer position="top" size="large">
                        <Pressable
                          onPress={() => {
                            sendVerification(
                              phonenumberPlusCountryCode,
                              recaptchaVerifier,
                              setPhonenumber,
                              setCountryCode,
                              navigation
                            );
                            setPopup(false);
                          }}>
                          <Text
                            variant="custom"
                            colorType="base"
                            fontType="montserratRegular"
                            fontSize="body">
                            Request OTP
                          </Text>
                        </Pressable>
                      </Spacer>
                    )}
                  </View>
                </HorizontalPaddingSpace>
              </PopupModal>
            )}
          </HorizontalPaddingSpace>
        </ViewContainer>
      </Pressable>
    </SafeArea>
  );
}
