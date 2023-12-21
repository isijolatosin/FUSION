import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  Linking,
  Platform,
  Pressable,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { SpaceArea } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import Button from "../../../components/utility/button.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import {
  LocationButtonText,
  LocationButtonWrapper,
  PopupModal,
} from "./onboarding.styles";
import {
  locationBackgroundImage,
  locationCaptureInstruction,
} from "../../../constants";
import { openLocationSettings } from "../../../utilities/setLocation";

export default function CaptureLocation({ navigation }) {
  const {
    state: { theme, user },
  } = useAppContext();
  const { height } = Dimensions.get("window");
  const [isLoading, setLoading] = useState(false);

  return (
    <SafeArea
      style={{
        height: `${height}px`,
        justifyContent: "center",
      }}>
      <Pressable onPress={Keyboard.dismiss}>
        <SpaceArea space={theme.space[6]}>
          <Spacer position="top" size="xxxxlarge">
            <IconComponent
              iconFunction={() => {}}
              iconName="location-pin"
              IconComponent={Entypo}
              size={80}
              color={theme.colors.brand.orange}
              centralize={true}
            />
          </Spacer>
          <Spacer position="top" size="large">
            <Text variant="headingSlim" width="100%">
              Enable your location services
            </Text>
          </Spacer>
          <Spacer position="top" size="large">
            <Text variant="caption" width="100%">
              {locationCaptureInstruction}
            </Text>
          </Spacer>

          <View
            style={{
              height: "45%",
              justifyContent: "flex-end",
            }}>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={theme.colors.brand.orange}
              />
            ) : (
              <Button
                backgroundColor={theme.colors.brand.orange}
                isBorder={false}
                buttonFunction={() => setLoading(true)}
                text="Enable Location"
                textColor={theme.colors.brand.white}
              />
            )}
          </View>
          {isLoading && (
            <PopupModal>
              <View
                style={{
                  height: "60%",
                  backgroundColor: "white",
                  paddingTop: 10,
                  width: "80%",
                  alignItems: "center",
                  elevation: 5,
                  shadowColor: theme.colors.text.primary,
                  shadowOpacity: 0.3,
                  shadowRadius: "5px",
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    paddingBottom: 10,
                  }}
                  variant="headingSlim"
                  width="80%">
                  Allow "Fusion" use your location.
                </Text>
                <Image
                  style={{ width: "100%", flex: 1, resizeMode: "cover" }}
                  source={{
                    uri: locationBackgroundImage,
                  }}
                />
                <LocationButtonWrapper
                  onPress={() =>
                    openLocationSettings(Linking, Platform, navigation)
                  }>
                  <LocationButtonText>Always Allow</LocationButtonText>
                </LocationButtonWrapper>
                <LocationButtonWrapper
                  onPress={() =>
                    openLocationSettings(Linking, Platform, navigation)
                  }
                  noBorderBottom={true}>
                  <LocationButtonText>Allow While Using App</LocationButtonText>
                </LocationButtonWrapper>
              </View>
            </PopupModal>
          )}
        </SpaceArea>
      </Pressable>
    </SafeArea>
  );
}
