import React, { useState } from "react";
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
import { Dimensions, Keyboard, Pressable } from "react-native";
import DropdownSelection from "./sub-component/DropdownSelection";
import { countryList } from "../../../constants";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import InputComponent from "../../../components/Input-Forms/InputComponent";

export default function CaptureCountry({ navigation }) {
  const [isOpen, setOpen] = useState(false);
  const { height } = Dimensions.get("window");
  const [country, setCountry] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { dob, _height, religious } = route.params || {};

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
                if (country) {
                  navigation.navigate("capture-sexual-orientation-screen", {
                    dob,
                    _height,
                    religious,
                    country,
                  });
                } else {
                  setPageError(true);
                }
              }}
            />
          </NavigationBar>
          <HorizontalPaddingSpace
            space={theme.space[3]}
            style={{
              marginTop: theme.spaceNumberBy10[9],
              height: height,
            }}>
            <Spacer position="top" size="large">
              <Text
                variant="custom"
                colorType="black"
                fontType="playfairbold"
                fontSize="h3"
                width="100%">
                What is your nationality?
              </Text>
            </Spacer>
            <OnboardingErrorComponent
              pageError={pageError}
              text="Please provide your country"
              size="caption"
            />
            <Spacer position="top" size="xxsmall">
              <Text
                variant="custom"
                colorType="lines"
                fontType="montserratRegular"
                fontSize="caption"
                width="100%">
                Type your country below to filter or use the "Choose an option"
                button to select from dropdown.
              </Text>
            </Spacer>
            <Spacer position="top" size="large">
              <InputComponent
                includeIcon={false}
                keyboardTyp="text-pad"
                setValue={(text) => setCountry(text)}
                value={country}
                width="100%"
                isCountryCode={false}
                isBackgroundColor={false}
                placeholder="Type here..."
                fontSize={theme.fontSizes.body}
                fontType={theme.fonts.montserratLight}
              />
            </Spacer>
            <Spacer position="top" size="xxxlarge">
              <DropdownSelection
                data={countryList}
                isOpen={isOpen}
                setOpen={setOpen}
                value={country}
                setFunction={setCountry}
                theme={theme}
                isForHeightComponent={false}
              />
            </Spacer>
          </HorizontalPaddingSpace>
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
