import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Keyboard, Pressable, View, Platform } from "react-native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { InputWarraper, NavigationBar } from "./onboarding.styles";
import { dobInstruction } from "../../../constants";
import NextNavigation from "../../../components/Next-navigation";
import OnboardingErrorComponent from "./OnboardingErrorComponent";

export default function CaptureDOB({ navigation }) {
  const { height } = Dimensions.get("window");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  let dob = {};
  if (month && day && year) {
    dob = {
      day: day,
      month: month,
      year: year,
    };
  }

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
                if (Object.values(dob).length > 2 || (month && day && year)) {
                  navigation.navigate("capture-height-screen", { dob });
                } else {
                  setPageError(true);
                }
              }}
            />
          </NavigationBar>
          <HorizontalPaddingSpace
            space={theme.space[0]}
            style={{
              marginTop: 100,
              height: height,
            }}>
            <Spacer position="top" size="xxxlarge">
              <Text
                variant="custom"
                colorType="black"
                fontType="playfairbold"
                fontSize="h3"
                width="100%">
                We would love to know your birth date?
              </Text>
            </Spacer>
            <Spacer position="top" size="xlarge">
              <InputWarraper theme={theme} gap={theme.space[5]}>
                <View style={{ width: "20%", alignItems: "center" }}>
                  <Spacer position="bottom" size="xsmall">
                    <Text
                      variant="custom"
                      colorType="base"
                      fontType="montserratSemibold"
                      fontSize="caption">
                      Month
                    </Text>
                  </Spacer>
                  <InputComponent
                    centralize={true}
                    keyboardType="number-pad"
                    includeIcon={false}
                    setValue={setMonth}
                    value={month}
                    isCountryCode={false}
                    backgroundColor={"highlight"}
                    isBackgroundColor={true}
                    fontType={theme.fonts.montserratRegular}
                    maxlength={2}
                  />
                </View>
                <View style={{ width: "20%", alignItems: "center" }}>
                  <Spacer position="bottom" size="xsmall">
                    <Text
                      variant="custom"
                      colorType="base"
                      fontType="montserratSemibold"
                      fontSize="caption">
                      Day
                    </Text>
                  </Spacer>
                  <InputComponent
                    centralize={true}
                    keyboardType="number-pad"
                    includeIcon={false}
                    setValue={setDay}
                    value={day}
                    isCountryCode={false}
                    backgroundColor={"highlight"}
                    isBackgroundColor={true}
                    fontType={theme.fonts.montserratRegular}
                    maxlength={2}
                  />
                </View>
                <View
                  style={{
                    width: Platform.OS === "ios" ? "46.5%" : "45%",
                    alignItems: "center",
                  }}>
                  <Spacer position="bottom" size="xsmall">
                    <Text
                      variant="custom"
                      colorType="base"
                      fontType="montserratSemibold"
                      fontSize="caption">
                      Year
                    </Text>
                  </Spacer>
                  <InputComponent
                    centralize={true}
                    keyboardType="number-pad"
                    includeIcon={false}
                    setValue={setYear}
                    value={year}
                    isCountryCode={false}
                    backgroundColor={"highlight"}
                    isBackgroundColor={true}
                    fontType={theme.fonts.montserratRegular}
                    maxlength={4}
                  />
                </View>
              </InputWarraper>
            </Spacer>
            <Spacer position="top" size="xxxxlarge">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratRegular"
                fontSize="caption">
                {dobInstruction}
              </Text>
            </Spacer>
            <OnboardingErrorComponent
              pageError={pageError}
              text="Please provide your date of birth"
              size="caption"
            />
          </HorizontalPaddingSpace>
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
