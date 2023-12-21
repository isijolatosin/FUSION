import React, { useState } from "react";
import { Keyboard, Pressable } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { SpaceArea } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { IconAndText, NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import InputComponent from "../../../components/Input-Forms/InputComponent";

export default function CaptureAddress({ navigation }) {
  const [address, setAddress] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
    dispatch,
  } = useAppContext();
  const route = useRoute();
  const { user } = route.params || {};

  return (
    <SafeArea>
      <Pressable onPress={Keyboard.dismiss}>
        <SpaceArea space={theme.space[5]}>
          <NavigationBar>
            <IconComponent
              iconFunction={() => navigation.goBack()}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={30}
              color={theme.colors.brand.orange}
            />
            <NextNavigation
              theme={theme}
              color={theme.colors.brand.orange}
              nextFunction={() => {
                if (address) {
                  user.address = address;
                  dispatch({
                    type: "SET_USER",
                    payload: user,
                  });
                  navigation.navigate("capture-location");
                } else {
                  setPageError(true);
                }
              }}
            />
          </NavigationBar>
          <Spacer position="top" size="xxxxlarge">
            <Text variant="headingSlim" width="65%">
              Where do you stay?
            </Text>
          </Spacer>
          <Spacer position="top" size="large">
            <InputComponent
              includeIcon={false}
              keyboardTyp="text-pad"
              setValue={setAddress}
              value={address}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Address"
            />
          </Spacer>
          {pageError && (
            <Spacer position="top" size="large">
              <Text variant="error" width="100%">
                Error: Please provide your address!
              </Text>
            </Spacer>
          )}
          <IconAndText
            style={{
              height: "40%",
              alignItems: "flex-end",
            }}>
            <IconComponent
              iconFunction={() => {}}
              iconName="eye-off"
              IconComponent={Feather}
              size={15}
              color={theme.colors.brand.orange}
            />
            <Text
              style={{ marginLeft: theme.spaceNumber[2] }}
              variant="caption"
              width="100%">
              Hidden on your profile
            </Text>
          </IconAndText>
        </SpaceArea>
      </Pressable>
    </SafeArea>
  );
}
