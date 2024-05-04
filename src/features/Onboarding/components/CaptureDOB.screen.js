import React, { useState } from "react";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import {
  Dimensions,
  Keyboard,
  Pressable,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { InputWarraper } from "./onboarding.styles";
import {
  agerestrictionmessage,
  dobInstruction,
  months,
} from "../../../constants";
import NextNavigation from "../../../components/Next-navigation";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import calculateAge from "../../../utilities/calculateAge";
import HeaderComponent from "../../../components/general-component/HeaderComponent";

export default function CaptureDOB({ navigation }) {
  const { height } = Dimensions.get("window");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [pageError, setPageError] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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

  function validateAgeRestriction() {
    if (calculateAge(year, month, day) < 18) return false;
    return true;
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    setDay(+day);
    setMonth(months.indexOf(month) + 1);
    setYear(+year);

    hideDatePicker();
  };

  return (
    <SafeArea>
      <Pressable onPress={Keyboard.dismiss}>
        <HorizontalPaddingSpace space={theme.space[2]}>
          <HeaderComponent
            title="Onboarding"
            theme={theme}
            textWidth="102%"
            topSpace="small"
            size="title"
            LeftComp={() => (
              <IconComponent
                iconFunction={() => navigation.goBack()}
                iconName="chevron-back"
                IconComponent={Ionicons}
                size={30}
                color={theme.colors.brand.base}
              />
            )}
            RightComp={() => (
              <NextNavigation
                theme={theme}
                color={theme.colors.brand.base}
                nextFunction={() => {
                  if (day && month && year && validateAgeRestriction()) {
                    navigation.navigate("capture-height-screen", { dob });
                  } else {
                    setPageError(true);
                  }
                }}
              />
            )}
          />
          <HorizontalPaddingSpace
            space={theme.space[3]}
            style={{
              height: height,
            }}>
            <Spacer position="top" size="xxxlarge">
              <Text
                variant="custom"
                colorType="lines"
                fontType="arimaMadurai"
                fontSize="h4"
                lineHeight={theme.lineHeights[25]}
                width="100%">
                When is
              </Text>
              <Text
                variant="custom"
                colorType="black"
                fontType="arimaMadurai"
                fontSize="h4"
                lineHeight={theme.lineHeights[25]}
                width="100%">
                your birthday?
              </Text>
            </Spacer>
            <Spacer position="top" size="xlarge">
              {Platform.OS === "ios" ? (
                <>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={{
                      position: "relative",
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    <IconComponent
                      iconFunction={() => showDatePicker()}
                      iconName="date"
                      IconComponent={Fontisto}
                      size={35}
                      color={theme.colors.brand.brandTone}
                    />
                    <View style={{ marginLeft: theme.spaceNumber[5] }}>
                      <Text
                        variant="custom"
                        colorType="black"
                        fontType="montserratRegular"
                        fontSize="body">
                        Select your Date of birth
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                  />
                </>
              ) : (
                <InputWarraper theme={theme} gap={theme.space[5]}>
                  <View style={{ width: "20%", alignItems: "center" }}>
                    <Spacer position="bottom" size="xsmall">
                      <Text
                        variant="custom"
                        colorType="base"
                        fontType="montserratSemibold"
                        lineHeight={theme.lineHeights[0]}
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
                        lineHeight={theme.lineHeights[0]}
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
                        lineHeight={theme.lineHeights[0]}
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
              )}
            </Spacer>
            {month && year && day && (
              <Spacer position="top" size="large">
                <Text
                  variant="custom"
                  colorType="base"
                  fontType="montserratSemibold"
                  lineHeight={theme.lineHeights[0]}
                  fontSize="caption">
                  {`You selected ${months[month - 1]} ${day} ${year}`}
                </Text>
              </Spacer>
            )}
            <Spacer position="top" size="xxxxlarge">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratRegular"
                lineHeight={theme.lineHeights[0]}
                fontSize="caption">
                {dobInstruction}
              </Text>
            </Spacer>
            <OnboardingErrorComponent
              pageError={pageError}
              text={agerestrictionmessage}
              size="body"
            />
          </HorizontalPaddingSpace>
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
