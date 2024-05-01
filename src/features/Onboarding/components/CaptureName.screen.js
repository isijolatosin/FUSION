import React, { useState } from "react";
import { Keyboard, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import { nameCaptureInstruction } from "../../../constants";
import HeaderComponent from "../../../components/general-component/HeaderComponent";
import OnboardingErrorComponent from "./OnboardingErrorComponent";

export default function CaptureName({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { email, phonenumber } = route.params || {};

  return (
    <SafeArea>
      <Pressable onPress={Keyboard.dismiss}>
        <HorizontalPaddingSpace space={theme.space[3]}>
          <HeaderComponent
            title="Onboarding"
            theme={theme}
            textWidth="111%"
            topSpace="small"
            size="title"
            LeftComp={() => <></>}
            RightComp={() => (
              <NextNavigation
                theme={theme}
                color={theme.colors.brand.base}
                nextFunction={() => {
                  if (firstname) {
                    navigation.navigate("capture-location-screen", {
                      user: {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        phonenumber: phonenumber,
                      },
                    });
                  } else {
                    setPageError(true);
                  }
                }}
              />
            )}
          />
          <Spacer position="top" size="xxxxlarge">
            <Text
              variant="custom"
              colorType="linesLight"
              fontType="arimaMadurai"
              fontSize="h4"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              What's your
            </Text>
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h4"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              name?
            </Text>
          </Spacer>
          <Spacer position="top" size="large">
            <InputComponent
              includeIcon={false}
              keyboardTyp="text-pad"
              setValue={(text) => setFirstname(text.toLowerCase())}
              value={firstname}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="First Name"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
          </Spacer>
          <Spacer position="top" size="large">
            <InputComponent
              includeIcon={false}
              keyboardTyp="text-pad"
              setValue={(text) => setLastname(text.toLowerCase())}
              value={lastname}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Last Name (optional)"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
          </Spacer>
          <Spacer position="top" size="large">
            <Text
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              lineHeight={theme.lineHeights[0]}
              fontSize="caption"
              width="100%">
              {nameCaptureInstruction}
            </Text>
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please provide your name!"
            size="body"
            classes={{
              textAlign: "left",
              color: theme.colors.brand.error,
              fontFamily: theme.fonts.montserratSemibold,
              fontSize: theme.spaceNumber[7],
              marginTop: theme.spaceNumber[2],
            }}
          />
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
