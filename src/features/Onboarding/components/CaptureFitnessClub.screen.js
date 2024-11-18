import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import { Dimensions, KeyboardAvoidingView } from "react-native";
import DropdownSelection from "./sub-component/DropdownSelection";
import { gymTypesByCountry } from "../../../constants";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import HeaderComponent from "../../../components/general-component/HeaderComponent";
import { formatCountryName } from "../../../utilities/formatCountryName";
import InputComponent from "../../../components/Input-Forms/InputComponent";

export default function CaptureFitnessClub({ navigation }) {
  const [isOpen, setOpen] = useState(false);
  const { height } = Dimensions.get("window");
  const [pageError, setPageError] = useState(false);
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [fitnessName, setFitnessName] = useState("");
  const {
    state: { theme, user },
  } = useAppContext();

  const route = useRoute();
  const { dob, _height, sexualOrientation, preference, gymGoals } =
    route.params || {};
  return (
    <SafeArea>
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
                if (street && city && province && fitnessName) {
                  const fitnessClub = {
                    address: `${street}, ${city}, ${province}. ${
                      postalcode ? postalcode : ""
                    }`,
                    name: fitnessName,
                  };

                  setFitnessName("");
                  setPostalCode("");
                  setProvince("");
                  setStreet("");
                  setCity("");

                  navigation.navigate("capture-share-interest-screen", {
                    dob,
                    _height,
                    sexualOrientation,
                    preference,
                    gymGoals,
                    fitnessClub,
                  });
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
          <Spacer position="top" size="xxxxlarge">
            <Text
              variant="custom"
              colorType="lines"
              fontType="arimaMadurai"
              fontSize="h5"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              Where do you
            </Text>
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h4"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              work out?{" "}
              <Text
                variant="custom"
                colorType="brandTone"
                fontType="arimaMadurai"
                fontSize="caption"
                lineHeight={theme.lineHeights[5]}
                width="100%">
                (Required *)
              </Text>
            </Text>
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please complete the fields below"
            size="body"
            classes={{
              textAlign: "left",
              color: theme.colors.brand.error,
              fontFamily: theme.fonts.montserratSemibold,
              fontSize: theme.spaceNumber[7],
              marginTop: theme.spaceNumber[2],
            }}
          />
          <Spacer position="top" size="large">
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <InputComponent
                includeIcon={false}
                keyboardType="default"
                setValue={setStreet}
                value={street}
                width="100%"
                isCountryCode={false}
                placeholder="Street..."
                fontSize={theme.fontSizes.body}
                placeholderFontSize={theme.fontSizes.body}
                fontType={theme.fonts.montserratLight}
                fontColor={theme.colors.brand.base}
                backgroundColor="transparent"
                isBackgroundColor={false}
              />
              <InputComponent
                includeIcon={false}
                keyboardType="default"
                setValue={setCity}
                value={city}
                width="100%"
                isCountryCode={false}
                placeholder="City..."
                fontSize={theme.fontSizes.body}
                placeholderFontSize={theme.fontSizes.body}
                fontType={theme.fonts.montserratLight}
                fontColor={theme.colors.brand.base}
                backgroundColor="transparent"
                isBackgroundColor={false}
              />
              <InputComponent
                includeIcon={false}
                keyboardType="default"
                setValue={setProvince}
                value={province}
                width="100%"
                isCountryCode={false}
                placeholder="Province / State..."
                fontSize={theme.fontSizes.body}
                placeholderFontSize={theme.fontSizes.body}
                fontType={theme.fonts.montserratLight}
                fontColor={theme.colors.brand.base}
                backgroundColor="transparent"
                isBackgroundColor={false}
              />
              <InputComponent
                includeIcon={false}
                keyboardType="default"
                setValue={setPostalCode}
                value={postalcode}
                width="100%"
                isCountryCode={false}
                placeholder="Postalcode / Zipcode..."
                fontSize={theme.fontSizes.body}
                placeholderFontSize={theme.fontSizes.body}
                fontType={theme.fonts.montserratLight}
                fontColor={theme.colors.brand.base}
                backgroundColor="transparent"
                isBackgroundColor={false}
              />
            </KeyboardAvoidingView>
          </Spacer>
          <Spacer position="top" size="xxxlarge">
            <DropdownSelection
              data={gymTypesByCountry[formatCountryName(user?.country)]}
              isOpen={isOpen}
              setOpen={setOpen}
              value={fitnessName}
              setFunction={setFitnessName}
              theme={theme}
              isForHeightComponent={false}
              isWhiteBackground={true}
            />
          </Spacer>
        </HorizontalPaddingSpace>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
