import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import {
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
import {
  validateEmail,
  validatePhoneCode,
  validatePhoneNumber,
} from "../../../utilities/validateEmail";
import verifyUserInDatabaseBeforeSignin from "../../../utilities/verifyUserInDatabaseBeforeSignIn";
import ProgressBar from "../../../components/general-component/ProgressiveBar";

export default function CreateAccount({ navigation }) {
  const [email, setEmail] = useState(null);
  const [code, setCode] = useState(null);
  const [phonenumber, setPhonenumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPswd, setShowPswd] = useState(false);
  const [password2, setPassword2] = useState(null);
  const [showPswd2, setShowPswd2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logMessage, setLogMessage] = useState({
    message: "",
    code: "",
  });
  const [formValidate, setFormValidate] = useState({
    code: true,
    phonenumber: true,
    email: true,
    password: true,
    password2: true,
  });

  const { width, height } = Dimensions.get("window");
  const {
    state: { theme },
  } = useAppContext();

  async function signUp() {
    if (!email || !password || !password2 || !code || !phonenumber) {
      setFormValidate({
        code: !!code,
        phonenumber: !!phonenumber,
        email: !!email,
        password: !!password,
        password2: !!password2,
      });
      setLogMessage({
        message: "Kindly fill in the required field(s) highlighted in red.",
        code: "error",
      });

      return;
    }

    if (
      !validateEmail(email) ||
      !password ||
      !password2 ||
      !validatePhoneCode(`+${code}`) ||
      !validatePhoneNumber(phonenumber)
    ) {
      setFormValidate({
        code: !!validatePhoneCode(`+${code}`),
        phonenumber: !!validatePhoneNumber(phonenumber),
        email: !!validateEmail(email),
        password: !!password,
        password2: !!password2,
      });
      setLogMessage({
        message: "Please check field(s) and try again",
        code: "error",
      });

      return;
    }

    if (password !== password2) {
      setFormValidate({
        ...formValidate,
        password: false,
        password2: false,
      });
      setLogMessage({
        message:
          "Password does not match. Please ensure passwords match and try again",
        code: "error",
      });

      return;
    }

    const formattedPhonenumber = `+${code}${phonenumber}`;
    try {
      setLoading(true);

      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 1) {
            clearInterval(interval);
            return 1;
          }
          return prevProgress + 0.1;
        });
      }, 400);

      await auth.createUserWithEmailAndPassword(email, password);

      const emailPswdId = setTimeout(() => {
        setLoading(false);
        setCode(null);
        setPhonenumber(null);
        setEmail(null);
        setPassword(null);
        setPassword2(null);
        setLogMessage({
          message: "Account successfully created.",
          code: "success",
        });
        setFormValidate({
          code: true,
          phonenumber: true,
          email: true,
          password: true,
          password2: true,
        });
      }, 4000);

      const emailPswdId2 = setTimeout(async () => {
        const isVerifyUser = await verifyUserInDatabaseBeforeSignin(
          formattedPhonenumber
        );
        if (isVerifyUser) {
          console.log("Yes they are*******");
          navigation.navigate("main");
        } else {
          navigation.navigate("capture-name-screen", {
            email,
            phonenumber: formattedPhonenumber,
          });
        }
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(emailPswdId, emailPswdId2);
      };
    } catch (error) {
      let errorMsg = error.message;

      if (error.message?.includes("weak-password")) {
        errorMsg =
          "Password strength: Weak. Please try a new password combination";
        setFormValidate({
          ...formValidate,
          password: false,
          password2: false,
        });
      }

      if (error.message?.includes("already-in-use")) {
        errorMsg =
          "Email Already in use: Please provide your email for registration";
        setFormValidate({
          ...formValidate,
          email: false,
        });
      }

      setLogMessage({
        message: errorMsg,
        code: "error",
      });
      setLoading(false);
      setProgress(0);
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
            <View style={{ flex: 0.65, zIndex: theme.spaceNumberBy10[0] }}>
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
              <HorizontalPaddingSpace space={theme.space[6]}>
                <Spacer
                  position="bottom"
                  size="xsmall"
                  style={{ flexDirection: "row", width: "100%" }}>
                  <View
                    style={{
                      flex: 0.2,
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
                      maxlength={7}
                      value={code}
                      width="100%"
                      isCountryCode={false}
                      isBackgroundColor={false}
                      isBorderColor={
                        formValidate.code
                          ? theme.colors.brand.linesLighter
                          : theme.colors.brand.error
                      }
                      placeholder="123"
                      fontSize={theme.fontSizes.body}
                      placeholderFontSize={theme.fontSizes.button}
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
                      maxlength={10}
                      width="100%"
                      isCountryCode={false}
                      isBackgroundColor={false}
                      isBorderColor={
                        formValidate.phonenumber
                          ? theme.colors.brand.linesLighter
                          : theme.colors.brand.error
                      }
                      placeholder="phone no..."
                      fontSize={theme.fontSizes.body}
                      placeholderFontSize={theme.fontSizes.button}
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
                    isBorderColor={
                      formValidate.email
                        ? theme.colors.brand.linesLighter
                        : theme.colors.brand.error
                    }
                    placeholder="email..."
                    fontSize={theme.fontSizes.body}
                    placeholderFontSize={theme.fontSizes.button}
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
                    isBorderColor={
                      formValidate.password
                        ? theme.colors.brand.linesLighter
                        : theme.colors.brand.error
                    }
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
                    isBorderColor={
                      formValidate.password2
                        ? theme.colors.brand.linesLighter
                        : theme.colors.brand.error
                    }
                    placeholder="confirm password..."
                    fontSize={theme.fontSizes.body}
                    placeholderFontSize={theme.fontSizes.button}
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
                        fontSize="caption">
                        {logMessage.message}
                      </Text>
                    </HorizontalPaddingSpace>
                  </Spacer>
                )}

                <Spacer position="top" size="xxxlarge">
                  {/* loading */}
                  {loading ? (
                    <ProgressBar progress={progress} theme={theme} />
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
                        Create account
                      </Text>
                    </TouchableOpacity>
                  )}
                </Spacer>
                <Spacer position="top" size="xxlarge">
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
                      setFormValidate({
                        code: true,
                        phonenumber: true,
                        email: true,
                        password: true,
                        password2: true,
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
