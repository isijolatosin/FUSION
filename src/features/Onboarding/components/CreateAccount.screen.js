import React, { useState, useRef } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
  Dimensions,
  Keyboard,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";

import { firebaseConfig } from "../../../../config";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SpaceArea } from "../../../components/utility/space-area.component";
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
          <SpaceArea space={theme.space[5]}>
            <NavigationBar>
              <IconComponent
                iconFunction={() => navigation.goBack()}
                iconName="chevron-back"
                IconComponent={Ionicons}
                size={30}
                color={theme.colors.brand.orange}
              />
            </NavigationBar>
            <Spacer position="top" size="xxxlarge">
              <Text variant="headingSlim" width="50%">
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
              <Text variant="caption">
                We never share your details with anyone else. It’s our little
                secret. What happens if my number changes?
              </Text>
            </Spacer>
            {cellNumber.length > 10 && (
              <Spacer position="top" size="large">
                <TouchableOpacity
                  onPress={() => {
                    setPopup(true);
                  }}>
                  <Text variant="hint">Verify Number...</Text>
                </TouchableOpacity>
              </Spacer>
            )}
            {isPopup && (
              <PopupModal height={height}>
                <SpaceArea space={theme.space[6]}>
                  <Text style={{ position: "relative" }} variant="popupText">
                    Please note that your phone number is linked to your account
                    for security and communication purposes. If you change your
                    phone number, you would need to create a new account.
                  </Text>
                  <View style={{ position: "absolute", top: 20, right: 50 }}>
                    <IconComponent
                      color={theme.colors.brand.orange}
                      iconFunction={() => setPopup(false)}
                      iconName="close"
                      IconComponent={AntDesign}
                      size={25}
                    />
                  </View>
                  <View style={{ position: "absolute", bottom: 18, left: 58 }}>
                    {cellNumber.length > 10 && (
                      <Spacer position="top" size="large">
                        <TouchableOpacity
                          onPress={() => {
                            sendVerification(
                              phonenumberPlusCountryCode,
                              recaptchaVerifier,
                              setPhonenumber,
                              setCountryCode,
                              navigation
                            );
                          }}>
                          <Text variant="hint">Request OTP</Text>
                        </TouchableOpacity>
                      </Spacer>
                    )}
                  </View>
                </SpaceArea>
              </PopupModal>
            )}
          </SpaceArea>
        </ViewContainer>
      </Pressable>
    </SafeArea>
  );
}
