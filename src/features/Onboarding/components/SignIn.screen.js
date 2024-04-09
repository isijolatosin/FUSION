import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { auth } from "../../../../config";
import {
  validateEmail,
  validatePhoneCode,
  validatePhoneNumber,
} from "../../../utilities/validateEmail";
import { Text } from "../../../components/typography/text.component";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";
import verifyUserInDatabaseBeforeSignin from "../../../utilities/verifyUserInDatabaseBeforeSignIn";

export default function SignIn({ navigation }) {
  const [code, setCode] = useState(null);
  const [phonenumber, setPhonenumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPswd, setShowPswd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logMessage, setLogMessage] = useState({
    message: "",
    code: "",
  });

  const route = useRoute();
  const { phone } = route.params || {};

  const { width, height } = Dimensions.get("window");
  const {
    state: { theme },
  } = useAppContext();

  async function signIn() {
    if (
      !validateEmail(email) ||
      !password ||
      !validatePhoneCode(`+${code}`) ||
      !validatePhoneNumber(phonenumber)
    ) {
      setLogMessage({
        message:
          "Invalid credentials: You have presented an invalid login credentials, please check and try again",
        code: "error",
      });
      setLoading(false);

      return;
    }

    const formattedPhonenumber = `+${code}${phonenumber}`;
    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);

      if (phone) {
        storeData("phonenumber", phone);
      } else {
        storeData("phonenumber", formattedPhonenumber);
      }

      const emailPswdId = setTimeout(() => {
        setLoading(false);
        setPassword(null);
        setEmail(null);
        setCode(null);
        setPhonenumber(null);
        setLogMessage({
          message: "Signed in successfully!",
          code: "success",
        });
      }, 4000);

      const emailPswdId2 = setTimeout(() => {
        setLoading(false);
        setLogMessage({
          message: "",
          code: "",
        });
        if (verifyUserInDatabaseBeforeSignin(phone)) {
          navigation.navigate("main");
        } else {
          navigation.navigate("capture-name-screen");
        }
      }, 5000);

      return () => clearTimeout(emailPswdId, emailPswdId2);
    } catch (error) {
      console.log("ERROR:", error);

      let errorMsg = error.message;

      if (error.message.includes("invalid-login")) {
        errorMsg =
          "Invalid credentials: You have presented an invalid login credentials, please check and try again";
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
              marginTop: theme.spaceNumberBy50[0],
            }}>
            <Text
              style={{
                textAlign: "center",
              }}
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h4">
              Sign In
            </Text>
            <HorizontalPaddingSpace
              space={theme.space[6]}
              style={{ flex: 0.5 }}>
              <Spacer
                position="bottom"
                size="xsmall"
                style={{ flexDirection: "row", width: "100%" }}>
                <View
                  style={{
                    flex: 0.15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: theme.spaceNumberBy10[2],
                  }}>
                  <View style={{ marginTop: theme.spaceNumber[0] }}>
                    <Text
                      variant="custom"
                      colorType="lines"
                      fontType="montserratRegular"
                      fontSize="title"
                      width="100%">
                      +
                    </Text>
                  </View>
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
                    placeholder="123"
                    fontSize={theme.fontSizes.body}
                    placeholderFontSize={theme.fontSizes.button}
                    fontType={theme.fonts.montserratLight}
                    maxlength={7}
                  />
                </View>
                <View style={{ flex: 0.85 }}>
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
                    placeholder="phone no..."
                    fontSize={theme.fontSizes.body}
                    placeholderFontSize={theme.fontSizes.button}
                    fontType={theme.fonts.montserratLight}
                    maxlength={10}
                  />
                </View>
              </Spacer>
              <Spacer position="bottom" size="large">
                <InputComponent
                  autoCapitalize="none"
                  includeIcon={false}
                  inputMode="email"
                  keyboardTyp="email-address"
                  setValue={setEmail}
                  value={email}
                  width="100%"
                  isCountryCode={false}
                  isBackgroundColor={false}
                  isBorderColor={theme.colors.brand.linesLighter}
                  placeholder="email..."
                  fontSize={theme.fontSizes.body}
                  placeholderFontSize={theme.fontSizes.button}
                  fontType={theme.fonts.montserratLight}
                />
              </Spacer>
              <Spacer
                position="bottom"
                size="xxsmall"
                style={{ position: "relative" }}>
                <InputComponent
                  keyboardTyp="text-pad"
                  setValue={setPassword}
                  value={password}
                  width="100%"
                  isCountryCode={false}
                  isBackgroundColor={false}
                  isBorderColor={theme.colors.brand.linesLighter}
                  placeholder="password..."
                  fontSize={theme.fontSizes.body}
                  placeholderFontSize={theme.fontSizes.button}
                  fontType={theme.fonts.montserratLight}
                  secureTextEntry={showPswd ? false : true}
                />
                <View style={{ position: "absolute", top: "30%", right: 0 }}>
                  <IconComponent
                    iconFunction={() => setShowPswd(!showPswd)}
                    iconName={showPswd ? "eye-off-outline" : "eye-outline"}
                    IconComponent={Ionicons}
                    size={25}
                    color={theme.colors.brand.linesLight}
                  />
                </View>
              </Spacer>
              {logMessage.code && (
                <Spacer position="top" size="small">
                  <HorizontalPaddingSpace space={theme.space[6]}>
                    <Text
                      style={{ textAlign: "center" }}
                      variant="custom"
                      colorType={logMessage.code === "error" ? "error" : "teal"}
                      fontType="montserratRegular"
                      fontSize="xcaption">
                      {logMessage.message}
                    </Text>
                  </HorizontalPaddingSpace>
                </Spacer>
              )}
              <Spacer position="top" size="xxxxlarge">
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color={theme.colors.brand.base}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={signIn}
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
                      Login
                    </Text>
                  </TouchableOpacity>
                )}
              </Spacer>
              <Spacer position="top" size="medium">
                <TouchableOpacity
                  onPress={() => {
                    setPassword(null);
                    setEmail(null);
                    setLogMessage({
                      message: "",
                      code: "",
                    });
                    navigation.navigate("create-account");
                  }}>
                  <Text
                    style={{ textAlign: "center" }}
                    variant="custom"
                    colorType="base"
                    fontType="montserratSemibold"
                    fontSize="button">
                    Create Account
                  </Text>
                </TouchableOpacity>
              </Spacer>
            </HorizontalPaddingSpace>
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeArea>
  );
}
