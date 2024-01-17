import React, { useState } from "react";
import { Keyboard, Pressable } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { IconAndText, NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import InputComponent from "../../../components/Input-Forms/InputComponent";

export default function CaptureAddress({ navigation }) {
  const [address, setAddress] = useState({
    city: "",
    province: "",
    street: "",
  });
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
    dispatch,
  } = useAppContext();
  const route = useRoute();
  const { user } = route.params || {};

  function handleSetAddress(text, key) {
    setAddress({ ...address, [key]: text });
  }

  function checkAddress(address) {
    let isAddressComplete = false;

    if (address.street && address.province && address.city)
      isAddressComplete = true;

    return isAddressComplete;
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
                if (checkAddress(address)) {
                  user.address = address;
                  dispatch({
                    type: "SET_USER",
                    payload: user,
                  });
                  navigation.navigate("capture-location-screen");
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
              fontSize="h4"
              width="65%">
              Where do you stay?
            </Text>
          </Spacer>
          <Spacer position="top" size="large">
            <InputComponent
              includeIcon={false}
              keyboardTyp="text-pad"
              setValue={(text) => handleSetAddress(text, "street")}
              value={address.street}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Street"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
          </Spacer>
          <Spacer position="top" size="large">
            <InputComponent
              includeIcon={false}
              keyboardTyp="text-pad"
              setValue={(text) => handleSetAddress(text, "city")}
              value={address.city}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="City"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
          </Spacer>
          <Spacer position="top" size="large">
            <InputComponent
              includeIcon={false}
              keyboardTyp="text-pad"
              setValue={(text) => handleSetAddress(text, "province")}
              value={address.province}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Province"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
          </Spacer>
          {pageError && (
            <Spacer position="top" size="large">
              <Text
                variant="custom"
                colorType="error"
                fontType="montserratRegular">
                Error: Please provide your address!
              </Text>
            </Spacer>
          )}
          <IconAndText
            style={{
              height: "25%",
              alignItems: "flex-end",
            }}>
            <IconComponent
              iconFunction={() => {}}
              iconName="eye-off"
              IconComponent={Feather}
              size={15}
              color={theme.colors.brand.base}
            />
            <Text
              style={{ marginLeft: theme.spaceNumber[2] }}
              variant="custom"
              colorType="error"
              fontType="montserratSemibold"
              fontSize="caption"
              width="100%">
              Hidden on your profile
            </Text>
          </IconAndText>
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
