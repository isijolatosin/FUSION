import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { auth } from "../../../../config";
import { KeyboardAvoidingView } from "react-native";
import { validateEmail } from "../../../utilities/validateEmail";
import verifyUserInDatabaseBeforeSignin from "../../../utilities/verifyUserInDatabaseBeforeSignIn";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";

export default function CreateAccount({ navigation }) {
  const [email, setEmail] = useState(null);
  const [code, setCode] = useState(null);
  const [phonenumber, setPhonenumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPswd, setShowPswd] = useState(false);
  const [password2, setPassword2] = useState(null);
  const [showPswd2, setShowPswd2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logMessage, setLogMessage] = useState({
    message: "",
    code: "",
  });

  const { width, height } = Dimensions.get("window");
  const {
    state: { theme },
  } = useAppContext();

  async function signUp() {
    setLoading(true);

    if (
      !validateEmail(email) &&
      !password &&
      !password2 &&
      !code &&
      !phonenumber
    ) {
      setLogMessage({
        message: "Missing field(s). Please check all fields and try again",
        code: "error",
      });
      setLoading(false);

      return;
    }

    if (password !== password2) {
      setLogMessage({
        message:
          "Passcode does not match. Please enter passcodes and try again",
        code: "error",
      });
      setLoading(false);

      return;
    }
    const formattedPhonenumber = `+${code}${phonenumber}`;

    try {
      await auth.createUserWithEmailAndPassword(email, password);

      setCode(null);
      setPhonenumber(null);
      setEmail(null);
      setPassword(null);
      setPassword2(null);

      storeData("phonenumber", formattedPhonenumber);

      const emailPswdId = setTimeout(() => {
        setLoading(false);
        setLogMessage({
          message: "Account successfully created.",
          code: "success",
        });
      }, 4000);
      const emailPswdId2 = setTimeout(() => {
        if (verifyUserInDatabaseBeforeSignin(formattedPhonenumber)) {
          navigation.navigate("main");
        } else {
          navigation.navigate("capture-name-screen");
        }
      }, 5000);

      return () => clearTimeout(emailPswdId, emailPswdId2);
    } catch (error) {
      let errorMsg = error.message;

      if (error.message?.includes("weak-password")) {
        errorMsg =
          "Password strength: Weak. Please try a new combination of password";
      }

      if (error.message?.includes("already-in-use")) {
        errorMsg =
          "Email Already in use: Please provide an email for your registration";
      }

      setLogMessage({
        message: errorMsg,
        code: "error",
      });
      setLoading(false);
    }
  }

  return (
    <SafeArea>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              height: height,
              marginTop: theme.spaceNumberBy10[2],
              display: "flex",
              justifyContent: "space-between",
            }}>
            <View style={{ flex: 0.65 }}>
              <Spacer position="bottom" size="small">
                <Text
                  style={{
                    textAlign: "center",
                  }}
                  variant="custom"
                  colorType="black"
                  fontType="arimaMadurai"
                  fontSize="h4">
                  Create account
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                  }}
                  variant="custom"
                  colorType="base"
                  fontType="arimaMadurai"
                  fontSize="xcaption">
                  All required *
                </Text>
              </Spacer>
              <HorizontalPaddingSpace
                space={theme.space[6]}
                style={{ zIndex: theme.spaceNumberBy10[0] }}>
                <Spacer
                  position="bottom"
                  size="xsmall"
                  style={{ flexDirection: "row", width: "100%" }}>
                  <View
                    style={{ flex: 0.2, marginRight: theme.spaceNumber[5] }}>
                    <InputComponent
                      autoCapitalize="none"
                      centralize={true}
                      inputMode="numeric"
                      autoFocus={true}
                      includeIcon={false}
                      keyboardTyp="numeric"
                      setValue={setCode}
                      value={code}
                      width="100%"
                      isCountryCode={false}
                      isBackgroundColor={false}
                      isBorderColor={theme.colors.brand.linesLighter}
                      placeholder="+123"
                      fontSize={theme.fontSizes.body}
                      fontType={theme.fonts.montserratLight}
                    />
                  </View>
                  <View style={{ flex: 0.8 }}>
                    <InputComponent
                      autoCapitalize="none"
                      inputMode="numeric"
                      includeIcon={false}
                      keyboardTyp="numeric"
                      setValue={setPhonenumber}
                      value={phonenumber}
                      width="100%"
                      isCountryCode={false}
                      isBackgroundColor={false}
                      isBorderColor={theme.colors.brand.linesLighter}
                      placeholder="Phone number"
                      fontSize={theme.fontSizes.body}
                      fontType={theme.fonts.montserratLight}
                    />
                  </View>
                </Spacer>
                <Spacer position="bottom" size="xsmall">
                  <InputComponent
                    autoCapitalize="none"
                    inputMode="email"
                    includeIcon={false}
                    keyboardTyp="email-address"
                    setValue={setEmail}
                    value={email}
                    width="100%"
                    isCountryCode={false}
                    isBackgroundColor={false}
                    isBorderColor={theme.colors.brand.linesLighter}
                    placeholder="Email"
                    fontSize={theme.fontSizes.body}
                    fontType={theme.fonts.montserratLight}
                  />
                </Spacer>
                <Spacer
                  position="bottom"
                  size="xsmall"
                  style={{ position: "relative" }}>
                  <InputComponent
                    keyboardTyp="text-pad"
                    setValue={setPassword}
                    value={password}
                    width="100%"
                    isCountryCode={false}
                    isBackgroundColor={false}
                    isBorderColor={theme.colors.brand.linesLighter}
                    placeholder="Passcode"
                    fontSize={theme.fontSizes.body}
                    fontType={theme.fonts.montserratLight}
                    secureTextEntry={showPswd ? false : true}
                  />
                  <View style={{ position: "absolute", top: "30%", right: 0 }}>
                    <IconComponent
                      iconFunction={() => setShowPswd(!showPswd)}
                      iconName={showPswd ? "eye-off-outline" : "eye-outline"}
                      IconComponent={Ionicons}
                      size={20}
                      color={theme.colors.brand.linesLight}
                    />
                  </View>
                </Spacer>
                <View style={{ position: "relative" }}>
                  <InputComponent
                    keyboardTyp="text-pad"
                    setValue={setPassword2}
                    value={password2}
                    width="100%"
                    isCountryCode={false}
                    isBackgroundColor={false}
                    isBorderColor={theme.colors.brand.linesLighter}
                    placeholder="Verify passcode"
                    fontSize={theme.fontSizes.body}
                    fontType={theme.fonts.montserratLight}
                    secureTextEntry={showPswd2 ? false : true}
                  />
                  <View style={{ position: "absolute", top: "30%", right: 0 }}>
                    <IconComponent
                      iconFunction={() => setShowPswd2(!showPswd2)}
                      iconName={showPswd2 ? "eye-off-outline" : "eye-outline"}
                      IconComponent={Ionicons}
                      size={20}
                      color={theme.colors.brand.linesLight}
                    />
                  </View>
                </View>
                {logMessage.code && (
                  <Spacer position="top" size="small">
                    <HorizontalPaddingSpace space={theme.space[6]}>
                      <Text
                        style={{ textAlign: "center" }}
                        variant="custom"
                        colorType={
                          logMessage.code === "error" ? "error" : "teal"
                        }
                        fontType="montserratRegular"
                        fontSize="xcaption">
                        {logMessage.message}
                      </Text>
                    </HorizontalPaddingSpace>
                  </Spacer>
                )}

                <Spacer position="top" size="xxxlarge">
                  {loading ? (
                    <ActivityIndicator
                      size="small"
                      color={theme.colors.brand.base}
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={signUp}
                      style={{
                        backgroundColor: theme.colors.brand.black,
                        paddingVertical: theme.spaceNumber[4],
                      }}>
                      <Text
                        style={{ textAlign: "center" }}
                        variant="custom"
                        colorType="basewhite"
                        fontType="montserratRegular"
                        fontSize="button">
                        Create new account
                      </Text>
                    </TouchableOpacity>
                  )}
                </Spacer>
                <Spacer position="top" size="medium">
                  <TouchableOpacity
                    onPress={() => {
                      setCode(null);
                      setPhonenumber(null);
                      setEmail(null);
                      setPassword(null);
                      setPassword2(null);
                      setLogMessage({
                        message: "",
                        code: "",
                      });
                      navigation.navigate("sign-in");
                    }}>
                    <Text
                      style={{ textAlign: "center" }}
                      variant="custom"
                      colorType="base"
                      fontType="montserratSemibold"
                      fontSize="button">
                      Login
                    </Text>
                  </TouchableOpacity>
                </Spacer>
              </HorizontalPaddingSpace>
            </View>
            <View
              style={{
                flex: 0.35,
                width: width,
                marginBottom: theme.spaceNumberBy10[4],
              }}>
              <LottieView
                source={require("../../../../assets/animations/create.json")}
                autoPlay
                loop
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeArea>
  );
}
