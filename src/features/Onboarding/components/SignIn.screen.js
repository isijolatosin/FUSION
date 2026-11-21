import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
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
import checkPhoneOwnership from "../../../utilities/checkPhoneOwnership";
import ProgressBar from "../../../components/general-component/ProgressiveBar";

export default function SignIn({ navigation }) {
  const route = useRoute();
  const { phone } = route.params || {};

  const [code, setCode] = useState(phone ? phone.slice(1, -10) : null);
  const [phonenumber, setPhonenumber] = useState(
    phone ? phone.substr(-10) : null
  );
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPswd, setShowPswd] = useState(false);
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
  });

  const { width, height } = Dimensions.get("window");
  const {
    state: { theme },
  } = useAppContext();

  async function signIn() {
    if (!email || !password || !code || !phonenumber) {
      setFormValidate({
        code: !!code,
        phonenumber: !!phonenumber,
        email: !!email,
        password: !!password,
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
      !validatePhoneCode(`+${code}`) ||
      !validatePhoneNumber(phonenumber)
    ) {
      setFormValidate({
        code: !!validatePhoneCode(`+${code}`),
        phonenumber: !!validatePhoneNumber(phonenumber),
        email: !!validateEmail(email),
        password: !!password,
      });
      setLogMessage({
        message:
          "You have presented an invalid login credentials, please check and try again",
        code: "error",
      });

      return;
    }

    const formattedPhonenumber = `+${code}${phonenumber}`;
    try {
      setLoading(true);

      const intervl = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 1) {
            clearInterval(intervl);
            return 1;
          }
          return prevProgress + 0.1;
        });
      }, 400);

      await auth.signInWithEmailAndPassword(email, password);

      // Only continue if this phone number is new or belongs to this account.
      // Otherwise anyone could sign in with their own email plus another
      // person's phone number and open that person's profile.
      const phoneStatus = await checkPhoneOwnership(
        formattedPhonenumber,
        auth.currentUser?.email
      );
      if (phoneStatus === "taken") {
        await auth.signOut();
        clearInterval(intervl);
        setLoading(false);
        setProgress(0);
        setFormValidate({
          code: false,
          phonenumber: false,
          email: true,
          password: true,
        });
        setLogMessage({
          message:
            "This phone number is linked to a different account. Please check your phone number and email.",
          code: "error",
        });
        return;
      }

      storeData("phonenumber", formattedPhonenumber);

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

        setFormValidate({
          code: true,
          phonenumber: true,
          email: true,
          password: true,
        });
      }, 4000);

      const emailPswdId2 = setTimeout(async () => {
        setLoading(false);
        setLogMessage({
          message: "",
          code: "",
        });

        const isVerifyUser = phoneStatus === "owner";
        if (isVerifyUser) {
          navigation.navigate("main", { phonenumber: phonenumber });
        } else {
          navigation.navigate("capture-name-screen", {
            email,
            phonenumber: formattedPhonenumber,
          });
        }
      }, 5000);

      return () => {
        clearInterval(intervl);
        clearTimeout(emailPswdId, emailPswdId2);
      };
    } catch (error) {
      console.log("ERROR:", error);

      let errorMsg = error.message;

      if (error.message.includes("invalid-login")) {
        errorMsg =
          "User with these credentials does not exist. Please create account to proceed.";
        setFormValidate({
          code: false,
          phonenumber: false,
          email: false,
          password: false,
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

  const resetPassword = (email) => {
    auth.sendPasswordResetEmail(email).then(() => {
      try {
        setLogMessage({
          message: "Password reset email sent!",
          code: "success",
        });
      } catch (error) {
        console.log(`error message - ${error.message}`);
      }
    });
  };

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
              lineHeight={theme.lineHeights[25]}
              fontSize="h4">
              Sign In
            </Text>
            <HorizontalPaddingSpace
              space={theme.space[6]}
              style={{ flex: 0.5, zIndex: theme.spaceNumberBy10[0] }}>
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
                      lineHeight={theme.lineHeights[25]}
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
                    keyboardType="numeric"
                    setValue={setCode}
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
                    maxlength={7}
                  />
                </View>
                <View style={{ flex: 0.85 }}>
                  <InputComponent
                    autoCapitalize="none"
                    inputMode="numeric"
                    includeIcon={false}
                    keyboardType="numeric"
                    setValue={setPhonenumber}
                    value={phonenumber}
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
                    maxlength={10}
                  />
                </View>
              </Spacer>
              <Spacer position="bottom" size="large">
                <InputComponent
                  autoCapitalize="none"
                  includeIcon={false}
                  inputMode="email"
                  keyboardType="email-address"
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
                size="xxsmall"
                style={{ position: "relative" }}>
                <InputComponent
                  keyboardType="visible-password"
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
              {logMessage.code && (
                <Spacer position="top" size="small">
                  <HorizontalPaddingSpace space={theme.space[6]}>
                    <Text
                      style={{ textAlign: "center" }}
                      variant="custom"
                      colorType={logMessage.code === "error" ? "error" : "teal"}
                      fontType="montserratRegular"
                      fontSize="caption">
                      {logMessage.message}
                    </Text>
                  </HorizontalPaddingSpace>
                </Spacer>
              )}
              <Spacer position="top" size="xxxxlarge">
                {loading ? (
                  <ProgressBar progress={progress} theme={theme} />
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
                      lineHeight={theme.lineHeights[0]}
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
                    setFormValidate({
                      code: true,
                      phonenumber: true,
                      email: true,
                      password: true,
                    });
                    navigation.navigate("create-account");
                  }}>
                  <Text
                    style={{ textAlign: "center" }}
                    variant="custom"
                    colorType="base"
                    fontType="montserratSemibold"
                    lineHeight={theme.lineHeights[0]}
                    fontSize="button">
                    Create Account
                  </Text>
                </TouchableOpacity>
              </Spacer>
              <Spacer position="top" size="medium">
                <TouchableOpacity
                  onPress={() => {
                    if (!email) {
                      return setLogMessage({
                        message: "Please provide your email address",
                        code: "error",
                      });
                    }

                    setPassword(null);
                    setEmail(null);
                    setLogMessage({
                      message: "",
                      code: "",
                    });
                    setFormValidate({
                      code: true,
                      phonenumber: true,
                      email: true,
                      password: true,
                    });
                    resetPassword(email);
                  }}>
                  <Text
                    style={{ textAlign: "center" }}
                    variant="custom"
                    colorType="linesLight"
                    fontType="montserratSemibold"
                    lineHeight={theme.lineHeights[0]}
                    fontSize="caption">
                    Forget Password
                  </Text>
                </TouchableOpacity>
              </Spacer>
            </HorizontalPaddingSpace>
            <View
              style={{
                flex: 0.5,
                width: width,
                alignSelf: "center",
                marginBottom: theme.spaceNumberBy10[10],
              }}>
              <LottieView
                source={require("../../../../assets/animations/gym.json")}
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
