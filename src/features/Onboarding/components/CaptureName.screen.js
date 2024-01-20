import React, { useState } from "react";
import { Keyboard, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import { nameCaptureInstruction } from "../../../constants";

export default function CaptureName({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { phonenumber } = route.params || {};

  return (
    <SafeArea>
      <Pressable onPress={Keyboard.dismiss}>
        <HorizontalPaddingSpace space={theme.space[5]}>
          <NavigationBar>
            <IconComponent
              iconFunction={() => navigation.goBack()}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={30}
              color={theme.colors.brand.base}
            />
            <NextNavigation
              theme={theme}
              color={theme.colors.brand.base}
              nextFunction={() => {
                if (firstname) {
                  navigation.navigate("capture-email-screen", {
                    user: {
                      firstname: firstname,
                      lastname: lastname,
                      phonenumber: phonenumber,
                    },
                  });
                } else {
                  setPageError(true);
                }
              }}
            />
          </NavigationBar>
          <Spacer position="top" size="xxxxlarge">
            <Text
              variant="custom"
              colorType="black"
              fontType="playfairbold"
              fontSize="h3"
              width="55%">
              What's your name?
            </Text>
          </Spacer>
          <Spacer position="top" size="large">
            <InputComponent
              includeIcon={false}
              keyboardTyp="text-pad"
              setValue={setFirstname}
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
              setValue={setLastname}
              value={lastname}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Last Name"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
          </Spacer>
          <Spacer position="top" size="large">
            <Text
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="caption"
              width="100%">
              {nameCaptureInstruction}
            </Text>
          </Spacer>
          {pageError && (
            <Spacer position="top" size="large">
              <Text
                variant="custom"
                colorType="error"
                fontType="montserratRegular"
                width="100%">
                Error: Please provide your name!
              </Text>
            </Spacer>
          )}
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
